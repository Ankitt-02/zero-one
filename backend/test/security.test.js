const test = require("node:test");
const assert = require("node:assert/strict");
const { app } = require("../index");
const { createTestServer } = require("./helpers");

test.describe("Security Headers & Error Handling Suite", () => {
  let server;

  test.before(async () => {
    server = createTestServer(app);
    await server.start();
  });

  test.after(async () => {
    await server.close();
  });

  test.describe("1. Security Headers", () => {
    test("sets essential security headers and suppresses X-Powered-By", async () => {
      const res = await server.request("/allHoldings");

      // Verify MIME-sniffing protection
      assert.strictEqual(
        res.headers.get("x-content-type-options"),
        "nosniff",
        "X-Content-Type-Options must be nosniff"
      );

      // Verify Clickjacking protection
      assert.strictEqual(
        res.headers.get("x-frame-options"),
        "DENY",
        "X-Frame-Options must be DENY"
      );

      // Verify X-Powered-By is suppressed
      assert.strictEqual(
        res.headers.get("x-powered-by"),
        null,
        "X-Powered-By header must be disabled to prevent framework fingerprinting"
      );
    });
  });

  test.describe("2. Request Body Size Limits & Parsing Guards", () => {
    test("rejects payloads exceeding 10kb with 413 Payload Too Large", async () => {
      // 12KB payload
      const largePayload = {
        name: "Alice",
        email: "alice@example.com",
        password: "password123",
        extraData: "X".repeat(12 * 1024),
      };

      const res = await server.request("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(largePayload),
      });

      assert.strictEqual(res.status, 413);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.match(data.message, /Payload too large/i);
    });

    test("handles malformed JSON body safely with 400", async () => {
      const res = await server.request("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{ this is invalid json : true }",
      });

      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.match(data.message, /Malformed JSON payload/i);
    });
  });

  test.describe("3. Centralized Safe Error Handling", () => {
    test("catches internal errors and returns safe sanitized response without stack traces", async () => {
      // Temporarily inject a failing route or invoke an error condition
      // Using an invalid route to trigger 404 or an endpoint that throws
      const { UserModel } = require("../model/UserModel");
      const originalFindOne = UserModel.findOne;

      // Force an unexpected internal error during signup check
      UserModel.findOne = async () => {
        throw new Error("Simulated internal database glitch");
      };

      try {
        const res = await server.request("/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Bob", email: "bob@example.com", password: "password123" }),
        });

        assert.strictEqual(res.status, 500);
        const data = await res.json();
        assert.strictEqual(data.success, false);
        assert.strictEqual(data.message, "An internal server error occurred.");

        // Stack trace or internal error message MUST NOT be leaked to client
        assert.strictEqual(data.stack, undefined);
        assert.strictEqual(data.error, undefined);
      } finally {
        UserModel.findOne = originalFindOne;
      }
    });
  });
});
