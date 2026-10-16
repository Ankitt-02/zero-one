const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("FATAL: JWT_SECRET environment variable is missing in backend/.env");
  process.exit(1);
}

const app = express();

// Security Header Hardening
app.disable("x-powered-by");
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "0");
  next();
});

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Blocked by CORS policy"));
      }
    },
    credentials: true,
  })
);

// Payload size limit guard (10kb maximum body to prevent DoS)
app.use(bodyParser.json({ limit: "10kb" }));

// Lightweight In-Memory Rate Limiter for Authentication Endpoints
const createRateLimiter = ({
  windowMs = 60 * 1000,
  maxRequests = 10,
  message = "Too many attempts. Please try again after 60 seconds.",
} = {}) => {
  const requests = new Map();

  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of requests.entries()) {
      if (now > record.resetTime) {
        requests.delete(key);
      }
    }
  }, 60 * 1000);

  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }

  return (req, res, next) => {
    if (process.env.DISABLE_RATE_LIMIT === "true") {
      return next();
    }
    const ip = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";
    const now = Date.now();
    let record = requests.get(ip);

    if (!record || now > record.resetTime) {
      record = { count: 1, resetTime: now + windowMs };
      requests.set(ip, record);
    } else {
      record.count += 1;
    }

    if (record.count > maxRequests) {
      const retryAfterSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
      res.setHeader("Retry-After", retryAfterSeconds);
      return res.status(429).json({
        success: false,
        message,
      });
    }

    next();
  };
};

const authRateLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 10,
  message: "Too many authentication attempts. Please try again after 60 seconds.",
});

// Auth Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication required. No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid or expired session token." });
    }
    if (!decodedUser || !decodedUser.id) {
      return res.status(403).json({ success: false, message: "Malformed token payload." });
    }
    req.user = decodedUser;
    next();
  });
};

// ================= AUTHENTICATION ROUTES =================

// Register new user
app.post("/signup", authRateLimiter, async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: "Name must not exceed 100 characters.",
      });
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (email.trim().length > 254) {
      return res.status(400).json({
        success: false,
        message: "Email address is too long.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    if (!password || typeof password !== "string") {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    if (password.length > 128) {
      return res.status(400).json({
        success: false,
        message: "Password must not exceed 128 characters.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = await UserModel.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const newUser = new UserModel({
      name: name.trim(),
      email: cleanEmail,
    });

    const registeredUser = await UserModel.register(newUser, password);

    const token = jwt.sign(
      {
        id: registeredUser._id,
        name: registeredUser.name,
        email: registeredUser.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      token,
      user: {
        id: registeredUser._id,
        name: registeredUser.name,
        email: registeredUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Authenticate user
const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || typeof email !== "string" || !email.trim() || !password || typeof password !== "string") {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    if (email.trim().length > 254 || password.length > 128) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials format.",
      });
    }

    const authenticate = UserModel.authenticate();
    const { user, error } = await authenticate(email.trim().toLowerCase(), password);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password. Please check your credentials.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Signed in successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

app.post("/signin", authRateLimiter, handleLogin);
app.post("/login", authRateLimiter, handleLogin);

// Current user profile verification
app.get("/auth/me", authenticateToken, async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-hash -salt");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

// ================= DATA & TRADING ROUTES (USER-SCOPED) =================

// Fetch user-isolated portfolio holdings
app.get("/allHoldings", authenticateToken, async (req, res, next) => {
  try {
    const userHoldings = await HoldingsModel.find({ userId: req.user.id }).sort({ name: 1 });
    res.json(userHoldings);
  } catch (error) {
    next(error);
  }
});

// Fetch user-isolated open positions
app.get("/allPositions", authenticateToken, async (req, res, next) => {
  try {
    const userPositions = await PositionsModel.find({ userId: req.user.id }).sort({ name: 1 });
    res.json(userPositions);
  } catch (error) {
    next(error);
  }
});

// Fetch user-isolated order history
app.get("/allOrders", authenticateToken, async (req, res, next) => {
  try {
    const userOrders = await OrdersModel.find({ userId: req.user.id }).sort({ createdAt: -1, _id: -1 });
    res.json(userOrders);
  } catch (error) {
    next(error);
  }
});

// Submit user-isolated order
app.post("/newOrder", authenticateToken, async (req, res, next) => {
  try {
    const { name, qty, price, mode } = req.body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Valid instrument name is required." });
    }

    const trimmedName = name.trim().toUpperCase();
    if (trimmedName.length > 20 || !/^[A-Z0-9.\-_]+$/.test(trimmedName)) {
      return res.status(400).json({ error: "Instrument name must be alphanumeric and up to 20 characters." });
    }

    const parsedQty = parseInt(qty, 10);
    if (isNaN(parsedQty) || parsedQty <= 0 || parsedQty > 1000000 || !Number.isInteger(Number(qty))) {
      return res.status(400).json({ error: "Quantity must be a positive integer up to 1,000,000." });
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0 || parsedPrice > 10000000) {
      return res.status(400).json({ error: "Price must be a positive number up to 10,000,000." });
    }

    const upperMode = String(mode || "").trim().toUpperCase();
    if (upperMode !== "BUY" && upperMode !== "SELL") {
      return res.status(400).json({ error: "Mode must be either BUY or SELL." });
    }

    // STRICT PER-USER SCOPING: userId is derived exclusively from verified JWT, never trusted from body
    // Order is recorded in OPEN state awaiting batch 2 matching/execution engine
    const newOrder = new OrdersModel({
      userId: req.user.id,
      name: trimmedName,
      qty: parsedQty,
      price: parsedPrice,
      mode: upperMode,
      status: "OPEN",
      createdAt: new Date(),
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    next(error);
  }
});

// ================= CENTRALIZED ERROR HANDLING =================

app.use((err, req, res, next) => {
  if (err.type === "entity.too.large") {
    return res.status(413).json({ success: false, message: "Payload too large. Maximum body size is 10kb." });
  }
  if (err.status === 400 && err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ success: false, message: "Malformed JSON payload." });
  }
  if (err.message === "Blocked by CORS policy") {
    return res.status(403).json({ success: false, message: "CORS origin forbidden." });
  }
  console.error("Internal Server Error:", err.message);
  res.status(500).json({ success: false, message: "An internal server error occurred." });
});

// ================= SERVER START =================

const startServer = async () => {
  try {
    if (uri) {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB Atlas!");
    } else {
      console.warn("MONGO_URL not configured in backend/.env");
    }

    return app.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Database connection failure:", err.message);
    // Still listen so server is accessible and can report database status
    return app.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT} (offline DB mode)`);
    });
  }
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer, authenticateToken, createRateLimiter };
