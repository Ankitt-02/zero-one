const test = require("node:test");
const assert = require("node:assert/strict");
const { app } = require("../index");
const { HoldingsModel } = require("../model/HoldingsModel");
const { PositionsModel } = require("../model/PositionsModel");
const { OrdersModel } = require("../model/OrdersModel");
const { UserModel } = require("../model/UserModel");
const { createTestServer, createTestToken, ModelMockManager } = require("./helpers");

const mockManager = new ModelMockManager();

test.describe("Data Isolation & Authorization Test Suite", () => {
  let server;
  const userAId = "670c11111111111111111111";
  const userBId = "670c22222222222222222222";
  const tokenA = createTestToken({ id: userAId, email: "userA@example.com" });
  const tokenB = createTestToken({ id: userBId, email: "userB@example.com" });

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

  test.describe("1. Holdings Isolation", () => {
    test("rejects unauthenticated GET /allHoldings with 401", async () => {
      const res = await server.request("/allHoldings");
      assert.strictEqual(res.status, 401);
    });

    test("scopes holdings strictly to the requesting user", async () => {
      let queryA = null;
      let queryB = null;

      // Mock database store partitioned by userId
      const mockDatabaseHoldings = [
        { name: "TCS", qty: 10, price: 3500, userId: userAId },
        { name: "INFY", qty: 25, price: 1450, userId: userBId },
      ];

      HoldingsModel.find = (filter) => {
        if (filter.userId === userAId) queryA = filter;
        if (filter.userId === userBId) queryB = filter;

        const filtered = mockDatabaseHoldings.filter(h => h.userId === filter.userId);
        return {
          sort: () => Promise.resolve(filtered),
        };
      };

      // Request as User A
      const resA = await server.request("/allHoldings", {
        headers: { Authorization: `Bearer ${tokenA}` },
      });
      assert.strictEqual(resA.status, 200);
      const dataA = await resA.json();
      assert.strictEqual(queryA.userId, userAId);
      assert.strictEqual(dataA.length, 1);
      assert.strictEqual(dataA[0].name, "TCS");
      assert.strictEqual(dataA[0].userId, userAId);

      // Request as User B
      const resB = await server.request("/allHoldings", {
        headers: { Authorization: `Bearer ${tokenB}` },
      });
      assert.strictEqual(resB.status, 200);
      const dataB = await resB.json();
      assert.strictEqual(queryB.userId, userBId);
      assert.strictEqual(dataB.length, 1);
      assert.strictEqual(dataB[0].name, "INFY");
      assert.strictEqual(dataB[0].userId, userBId);
    });
  });

  test.describe("2. Positions Isolation", () => {
    test("rejects unauthenticated GET /allPositions with 401", async () => {
      const res = await server.request("/allPositions");
      assert.strictEqual(res.status, 401);
    });

    test("scopes positions strictly to the requesting user", async () => {
      let lastFilter = null;
      PositionsModel.find = (filter) => {
        lastFilter = filter;
        return {
          sort: () => Promise.resolve([{ name: "NIFTY_OPT", qty: 50, price: 120, userId: filter.userId }]),
        };
      };

      const res = await server.request("/allPositions", {
        headers: { Authorization: `Bearer ${tokenA}` },
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(lastFilter.userId, userAId, "Query must strictly filter by User A ID");
      assert.strictEqual(data[0].userId, userAId);
    });
  });

  test.describe("3. Orders History Isolation", () => {
    test("rejects unauthenticated GET /allOrders with 401", async () => {
      const res = await server.request("/allOrders");
      assert.strictEqual(res.status, 401);
    });

    test("scopes orders history strictly to the requesting user", async () => {
      let lastFilter = null;
      OrdersModel.find = (filter) => {
        lastFilter = filter;
        return {
          sort: () => Promise.resolve([{ name: "RELIANCE", qty: 15, price: 2400, mode: "BUY", userId: filter.userId }]),
        };
      };

      const res = await server.request("/allOrders", {
        headers: { Authorization: `Bearer ${tokenA}` },
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(lastFilter.userId, userAId, "Query must strictly filter by User A ID");
      assert.strictEqual(data[0].userId, userAId);
    });
  });

  test.describe("4. Profile Security Isolation", () => {
    test("user profile endpoint strips cryptographic credentials and enforces isolation", async () => {
      let queriedId = null;
      let selectedFields = null;

      UserModel.findById = (id) => {
        queriedId = id;
        return {
          select: (fields) => {
            selectedFields = fields;
            return Promise.resolve({
              _id: id,
              name: "Isolated User A",
              email: "isolatedA@example.com",
              createdAt: new Date(),
            });
          },
        };
      };

      const res = await server.request("/auth/me", {
        headers: { Authorization: `Bearer ${tokenA}` },
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();

      assert.strictEqual(queriedId, userAId);
      assert.strictEqual(selectedFields, "-hash -salt", "Must explicitly exclude hash and salt fields");
      assert.strictEqual(data.user.id, userAId);
      assert.strictEqual(data.user.hash, undefined);
      assert.strictEqual(data.user.salt, undefined);
    });
  });
});
