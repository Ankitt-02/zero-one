const test = require("node:test");
const assert = require("node:assert/strict");
const { app, authenticateToken, createRateLimiter } = require("../index");
const { UserModel } = require("../model/UserModel");
const { createTestServer, createTestToken, JWT_SECRET, ModelMockManager } = require("./helpers");

const mockManager = new ModelMockManager();

test.describe("Authentication & Password Security Suite", () => {
  let server;

  test.before(async () => {
    server = createTestServer(app);
    await server.start();
  });

  test.after(async () => {
    await server.close();
    mockManager.restoreAll();
  });

  test.afterEach(() => {
    mockManager.restoreAll();
  });

  test.describe("1. Password Storage & PBKDF2 Hashing Verification", () => {
    test("passport-local-mongoose uses salted PBKDF2 hashing and never stores raw passwords", async () => {
      // Create user schema instance using passport-local-mongoose
      const user = new UserModel({
        name: "Hash Test User",
        email: "hash@example.com",
      });

      // Set password using passport-local-mongoose cryptographically salted PBKDF2
      await user.setPassword("SuperSecretPassword123!");

      // Assertions on the stored user document
      assert.ok(user.hash, "Salted PBKDF2 hash must be generated");
      assert.ok(user.salt, "Unique cryptographic salt must be generated");
      assert.strictEqual(typeof user.hash, "string");
      assert.strictEqual(typeof user.salt, "string");
      assert.strictEqual(user.salt.length, 64, "Salt must be 32 bytes (64 hex characters)");
      assert.strictEqual(user.hash.length, 1024, "PBKDF2 hash must be 512 bits (1024 hex characters)");

      // Verify that raw password is NOT stored anywhere on the model
      assert.strictEqual(user.password, undefined, "Plaintext password must never be stored");
      assert.strictEqual(user.toObject().password, undefined, "Plaintext password must never exist in toObject");

      // Verify authentication works using the salted PBKDF2 hash
      const authSuccess = await user.authenticate("SuperSecretPassword123!");
      assert.ok(authSuccess.user, "Correct password must verify against salt and hash");

      // Verify invalid password fails
      const authFail = await user.authenticate("WrongPassword!");
      assert.strictEqual(authFail.user, false, "Incorrect password must be rejected");
    });
  });

  test.describe("2. Signup Input Validation & Safeguards", () => {
    test("rejects signup with missing name", async () => {
      const res = await server.request("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "user@example.com", password: "password123" }),
      });
      const data = await res.json();
      assert.strictEqual(res.status, 400);
      assert.strictEqual(data.success, false);
      assert.match(data.message, /Name is required/i);
    });

    test("rejects signup with excessively long name (>100 chars)", async () => {
      const longName = "A".repeat(101);
      const res = await server.request("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: longName, email: "user@example.com", password: "password123" }),
      });
      const data = await res.json();
      assert.strictEqual(res.status, 400);
      assert.strictEqual(data.success, false);
      assert.match(data.message, /Name must not exceed 100 characters/i);
    });

    test("rejects signup with missing email", async () => {
      const res = await server.request("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Alice", password: "password123" }),
      });
      const data = await res.json();
      assert.strictEqual(res.status, 400);
      assert.strictEqual(data.success, false);
      assert.match(data.message, /Email is required/i);
    });

    test("rejects signup with invalid email format", async () => {
      const res = await server.request("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Alice", email: "not-an-email", password: "password123" }),
      });
      const data = await res.json();
      assert.strictEqual(res.status, 400);
      assert.strictEqual(data.success, false);
      assert.match(data.message, /valid email address/i);
    });

    test("rejects signup with password shorter than 6 characters", async () => {
      const res = await server.request("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Alice", email: "alice@example.com", password: "123" }),
      });
      const data = await res.json();
      assert.strictEqual(res.status, 400);
      assert.strictEqual(data.success, false);
      assert.match(data.message, /at least 6 characters/i);
    });

    test("rejects signup with password longer than 128 characters", async () => {
      const longPassword = "P".repeat(129);
      const res = await server.request("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Alice", email: "alice@example.com", password: longPassword }),
      });
      const data = await res.json();
      assert.strictEqual(res.status, 400);
      assert.strictEqual(data.success, false);
      assert.match(data.message, /not exceed 128 characters/i);
    });

    test("rejects signup when email already exists (409 Conflict)", async () => {
      UserModel.findOne = async () => ({ _id: "existing_id", email: "duplicate@example.com" });

      const res = await server.request("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Alice", email: "duplicate@example.com", password: "validPassword123" }),
      });
      const data = await res.json();
      assert.strictEqual(res.status, 409);
      assert.strictEqual(data.success, false);
      assert.match(data.message, /already exists/i);
    });

    test("successfully creates user with valid inputs and returns sanitized JWT session", async () => {
      UserModel.findOne = async () => null;
      UserModel.register = async (newUser) => ({
        _id: "user_1234567890abcdef123456",
        name: newUser.name,
        email: newUser.email,
        hash: "pbkdf2_secret_hash_value",
        salt: "pbkdf2_secret_salt_value",
      });

      const res = await server.request("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "New User", email: "newuser@example.com", password: "ValidPassword123!" }),
      });
      const data = await res.json();

      assert.strictEqual(res.status, 201);
      assert.strictEqual(data.success, true);
      assert.ok(data.token, "JWT token must be returned");
      assert.strictEqual(data.user.id, "user_1234567890abcdef123456");
      assert.strictEqual(data.user.name, "New User");
      assert.strictEqual(data.user.email, "newuser@example.com");

      // Verify hash and salt are NEVER returned in response
      assert.strictEqual(data.user.hash, undefined);
      assert.strictEqual(data.user.salt, undefined);
    });
  });

  test.describe("3. Signin Input Validation & Credential Verification", () => {
    test("rejects signin with missing credentials", async () => {
      const res = await server.request("/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "" }),
      });
      const data = await res.json();
      assert.strictEqual(res.status, 400);
      assert.strictEqual(data.success, false);
    });

    test("rejects signin with invalid credentials", async () => {
      UserModel.authenticate = () => async () => ({ user: null, error: new Error("Invalid credentials") });

      const res = await server.request("/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "user@example.com", password: "WrongPassword" }),
      });
      const data = await res.json();
      assert.strictEqual(res.status, 401);
      assert.strictEqual(data.success, false);
      assert.match(data.message, /invalid email or password/i);
    });

    test("signs in valid user with 200 and sanitized response", async () => {
      UserModel.authenticate = () => async (email) => ({
        user: {
          _id: "user_valid_id",
          name: "Test User",
          email: email,
        },
        error: null,
      });

      const res = await server.request("/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "valid@example.com", password: "CorrectPassword123" }),
      });
      const data = await res.json();
      assert.strictEqual(res.status, 200);
      assert.strictEqual(data.success, true);
      assert.ok(data.token);
      assert.strictEqual(data.user.id, "user_valid_id");
      assert.strictEqual(data.user.hash, undefined);
      assert.strictEqual(data.user.salt, undefined);
    });
  });

  test.describe("4. Authentication Middleware Security", () => {
    test("rejects request without Authorization header with 401", async () => {
      const res = await server.request("/auth/me");
      assert.strictEqual(res.status, 401);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.match(data.message, /no token provided/i);
    });

    test("rejects request with malformed Bearer header with 401", async () => {
      const res = await server.request("/auth/me", {
        headers: { Authorization: "Bearer " },
      });
      assert.strictEqual(res.status, 401);
    });

    test("rejects request with forged / invalid signature JWT with 403", async () => {
      const forgedToken = createTestToken({ id: "user_victim" }, { secret: "wrong_secret_key" });
      const res = await server.request("/auth/me", {
        headers: { Authorization: `Bearer ${forgedToken}` },
      });
      assert.strictEqual(res.status, 403);
      const data = await res.json();
      assert.match(data.message, /invalid or expired/i);
    });

    test("rejects request with expired JWT with 403", async () => {
      const expiredToken = createTestToken({ id: "user_expired" }, { expiresIn: "-1s" });
      const res = await server.request("/auth/me", {
        headers: { Authorization: `Bearer ${expiredToken}` },
      });
      assert.strictEqual(res.status, 403);
      const data = await res.json();
      assert.match(data.message, /invalid or expired/i);
    });

    test("rejects request with token missing id with 403", async () => {
      const tokenWithoutId = createTestToken({ name: "NoIdUser" });
      const res = await server.request("/auth/me", {
        headers: { Authorization: `Bearer ${tokenWithoutId}` },
      });
      assert.strictEqual(res.status, 403);
      const data = await res.json();
      assert.match(data.message, /malformed token payload/i);
    });

    test("accepts request with valid JWT and populates authenticated user", async () => {
      UserModel.findById = (id) => ({
        select: () => Promise.resolve({
          _id: id,
          name: "Verified User",
          email: "verified@example.com",
          createdAt: new Date(),
        }),
      });

      const validToken = createTestToken({ id: "user_authenticated_1", email: "verified@example.com" });
      const res = await server.request("/auth/me", {
        headers: { Authorization: `Bearer ${validToken}` },
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.strictEqual(data.user.id, "user_authenticated_1");
    });
  });

  test.describe("5. Rate Limiting Protection", () => {
    test("rate limiter returns 429 Too Many Requests after threshold is exceeded", () => {
      const limiter = createRateLimiter({ windowMs: 10000, maxRequests: 3 });

      const mockReq = { ip: "192.168.1.100", headers: {}, socket: {} };
      let lastStatus = null;
      let lastJson = null;
      let headersSet = {};

      const mockRes = {
        setHeader: (k, v) => { headersSet[k] = v; },
        status: (code) => {
          lastStatus = code;
          return {
            json: (obj) => { lastJson = obj; },
          };
        },
      };

      let passedCount = 0;
      const next = () => { passedCount++; };

      // First 3 requests should pass
      limiter(mockReq, mockRes, next);
      limiter(mockReq, mockRes, next);
      limiter(mockReq, mockRes, next);
      assert.strictEqual(passedCount, 3);
      assert.strictEqual(lastStatus, null);

      // 4th request must be rejected with 429
      limiter(mockReq, mockRes, next);
      assert.strictEqual(passedCount, 3, "4th request should not invoke next()");
      assert.strictEqual(lastStatus, 429);
      assert.strictEqual(lastJson.success, false);
      assert.ok(headersSet["Retry-After"] !== undefined, "Retry-After header must be set");
    });
  });
});
