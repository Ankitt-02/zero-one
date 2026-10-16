const test = require("node:test");
const assert = require("node:assert/strict");
const { app } = require("../index");
const { OrdersModel } = require("../model/OrdersModel");
const { createTestServer, createTestToken, ModelMockManager } = require("./helpers");

const mockManager = new ModelMockManager();

test.describe("Order Validation & Isolation Test Suite", () => {
  let server;
  const userAId = "670c11111111111111111111";
  const userBId = "670c22222222222222222222";
  const tokenA = createTestToken({ id: userAId, email: "userA@example.com" });

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

  test.describe("1. Order Input Validation", () => {
    test("rejects order with missing instrument name (400)", async () => {
      const res = await server.request("/newOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenA}`,
        },
        body: JSON.stringify({ qty: 10, price: 500, mode: "BUY" }),
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.match(data.error, /instrument name is required/i);
    });

    test("rejects order with blank/whitespace instrument name (400)", async () => {
      const res = await server.request("/newOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenA}`,
        },
        body: JSON.stringify({ name: "   ", qty: 10, price: 500, mode: "BUY" }),
      });
      assert.strictEqual(res.status, 400);
    });

    test("rejects order with instrument name exceeding 20 characters (400)", async () => {
      const res = await server.request("/newOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenA}`,
        },
        body: JSON.stringify({ name: "VERYLONGSYMBOLNAME12345", qty: 10, price: 500, mode: "BUY" }),
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.match(data.error, /up to 20 characters/i);
    });

    test("rejects order with instrument name containing invalid characters (400)", async () => {
      const res = await server.request("/newOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenA}`,
        },
        body: JSON.stringify({ name: "INFY<script>", qty: 10, price: 500, mode: "BUY" }),
      });
      assert.strictEqual(res.status, 400);
    });

    test("rejects order with zero, negative, or non-integer quantity (400)", async () => {
      const invalidQtys = [0, -5, "abc", 1.5, -0.5];
      for (const qty of invalidQtys) {
        const res = await server.request("/newOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenA}`,
          },
          body: JSON.stringify({ name: "RELIANCE", qty, price: 2500, mode: "BUY" }),
        });
        assert.strictEqual(res.status, 400, `Expected 400 for qty: ${qty}`);
        const data = await res.json();
        assert.match(data.error, /positive integer/i);
      }
    });

    test("rejects order with quantity exceeding 1,000,000 (400)", async () => {
      const res = await server.request("/newOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenA}`,
        },
        body: JSON.stringify({ name: "RELIANCE", qty: 1000001, price: 2500, mode: "BUY" }),
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.match(data.error, /up to 1,000,000/i);
    });

    test("rejects order with zero or negative price (400)", async () => {
      const invalidPrices = [0, -10, "free", -0.01];
      for (const price of invalidPrices) {
        const res = await server.request("/newOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenA}`,
          },
          body: JSON.stringify({ name: "TCS", qty: 10, price, mode: "BUY" }),
        });
        assert.strictEqual(res.status, 400, `Expected 400 for price: ${price}`);
        const data = await res.json();
        assert.match(data.error, /positive number/i);
      }
    });

    test("rejects order with price exceeding 10,000,000 (400)", async () => {
      const res = await server.request("/newOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenA}`,
        },
        body: JSON.stringify({ name: "TCS", qty: 1, price: 10000001, mode: "BUY" }),
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.match(data.error, /up to 10,000,000/i);
    });

    test("rejects order with invalid trading mode (400)", async () => {
      const invalidModes = ["HOLD", "SHORT", "CANCEL", ""];
      for (const mode of invalidModes) {
        const res = await server.request("/newOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenA}`,
          },
          body: JSON.stringify({ name: "INFY", qty: 5, price: 1400, mode }),
        });
        assert.strictEqual(res.status, 400, `Expected 400 for mode: ${mode}`);
        const data = await res.json();
        assert.match(data.error, /BUY or SELL/i);
      }
    });
  });

  test.describe("2. Order Authentication & Spoofing Prevention", () => {
    test("rejects unauthenticated order placement (401)", async () => {
      const res = await server.request("/newOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "INFY", qty: 10, price: 1500, mode: "BUY" }),
      });
      assert.strictEqual(res.status, 401);
    });

    test("ignores forged userId in payload and strictly scopes order to authenticated user", async () => {
      let savedOrderPayload = null;
      OrdersModel.prototype.save = async function () {
        savedOrderPayload = this;
        return this;
      };

      const res = await server.request("/newOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenA}`,
        },
        // Attacker attempts to forge order on behalf of User B
        body: JSON.stringify({
          userId: userBId,
          name: "HDFCBANK",
          qty: 25,
          price: 1650.5,
          mode: "BUY",
        }),
      });

      assert.strictEqual(res.status, 201);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(savedOrderPayload, "Order should be saved");

      // Verify that userId saved in the database matches token user A, NOT user B
      assert.strictEqual(savedOrderPayload.userId.toString(), userAId, "userId must be bound to token, not request body");
      assert.notStrictEqual(savedOrderPayload.userId.toString(), userBId, "Attacker cannot assign order to user B");

      // Verify status is recorded as OPEN awaiting Batch 2 matching engine
      assert.strictEqual(savedOrderPayload.status, "OPEN", "New orders must be recorded as OPEN, not auto-completed");
    });
  });
});
