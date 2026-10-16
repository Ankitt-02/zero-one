const { Duplex, Readable, Writable } = require("stream");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");
const { HoldingsModel } = require("../model/HoldingsModel");
const { PositionsModel } = require("../model/PositionsModel");
const { OrdersModel } = require("../model/OrdersModel");

const JWT_SECRET = process.env.JWT_SECRET || "zero-one-testing-secret-key-12345";
let testRequestCounter = 0;

/**
 * Creates an in-memory test runner for testing Express endpoints without requiring network sockets.
 * This guarantees 100% isolation from external networks and sandboxed compatibility.
 */
function createTestServer(app) {
  const start = async () => {};
  const close = async () => {};

  const request = (path, options = {}) => {
    return new Promise((resolve, reject) => {
      const method = (options.method || "GET").toUpperCase();
      const bodyStr = options.body ? (typeof options.body === "string" ? options.body : JSON.stringify(options.body)) : null;

      // Construct request stream
      const req = new Readable({
        read() {
          if (bodyStr) {
            this.push(bodyStr);
          }
          this.push(null);
        },
      });

      req.method = method;
      req.url = path;

      const headers = {};
      if (options.headers) {
        for (const [k, v] of Object.entries(options.headers)) {
          headers[k.toLowerCase()] = v;
        }
      }

      // Default distinct client IP per test request if not explicitly specified to avoid rate-limit crosstalk
      if (!headers["x-forwarded-for"]) {
        headers["x-forwarded-for"] = options.ip || `10.0.0.${(++testRequestCounter % 200) + 1}`;
      }

      if (bodyStr && !headers["content-length"]) {
        headers["content-length"] = String(Buffer.byteLength(bodyStr));
      }

      req.headers = headers;

      // Attach Duplex socket mock
      const socket = new Duplex({
        read() {},
        write(chunk, enc, cb) {
          cb();
        },
      });
      socket.remoteAddress = headers["x-forwarded-for"];
      req.connection = socket;
      req.socket = socket;

      // Construct response stream
      const resHeaders = {};
      const chunks = [];

      const res = new Writable({
        write(chunk, encoding, cb) {
          chunks.push(chunk);
          cb();
        },
      });

      res.statusCode = 200;
      res.setHeader = (name, value) => {
        resHeaders[name.toLowerCase()] = value;
      };
      res.getHeader = (name) => resHeaders[name.toLowerCase()];
      res.writeHead = (code, hdrs) => {
        res.statusCode = code;
        if (hdrs) {
          for (const [k, v] of Object.entries(hdrs)) {
            resHeaders[k.toLowerCase()] = v;
          }
        }
      };

      res.end = function (chunk) {
        if (chunk) chunks.push(Buffer.from(chunk));
        const rawBody = Buffer.concat(chunks).toString("utf8");
        let parsedJson = null;

        resolve({
          status: res.statusCode,
          headers: {
            get: (h) => (resHeaders[h.toLowerCase()] !== undefined ? resHeaders[h.toLowerCase()] : null),
            ...resHeaders,
          },
          text: async () => rawBody,
          json: async () => {
            if (parsedJson) return parsedJson;
            parsedJson = JSON.parse(rawBody);
            return parsedJson;
          },
        });
      };

      try {
        app.handle(req, res);
      } catch (err) {
        reject(err);
      }
    });
  };

  return { start, close, request };
}

/**
 * Signs a JWT with specified payload and options.
 */
function createTestToken(payload, options = {}) {
  const secret = options.secret || JWT_SECRET;
  const opts = { ...options };
  delete opts.secret;
  return jwt.sign(payload, secret, { expiresIn: "1h", ...opts });
}

/**
 * Manages model stubs to ensure tests NEVER access or mutate the production Atlas database.
 */
class ModelMockManager {
  constructor() {
    this.originals = {
      userFindOne: UserModel.findOne,
      userFindById: UserModel.findById,
      userAuthenticate: UserModel.authenticate,
      userRegister: UserModel.register,
      holdingsFind: HoldingsModel.find,
      positionsFind: PositionsModel.find,
      ordersFind: OrdersModel.find,
      ordersSave: OrdersModel.prototype.save,
    };
  }

  restoreAll() {
    UserModel.findOne = this.originals.userFindOne;
    UserModel.findById = this.originals.userFindById;
    UserModel.authenticate = this.originals.userAuthenticate;
    UserModel.register = this.originals.userRegister;
    HoldingsModel.find = this.originals.holdingsFind;
    PositionsModel.find = this.originals.positionsFind;
    OrdersModel.find = this.originals.ordersFind;
    OrdersModel.prototype.save = this.originals.ordersSave;
  }
}

module.exports = {
  createTestServer,
  createTestToken,
  JWT_SECRET,
  ModelMockManager,
};
