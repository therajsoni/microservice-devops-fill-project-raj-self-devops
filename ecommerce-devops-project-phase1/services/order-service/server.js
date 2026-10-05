const express = require("express");
const { Pool } = require("pg");
const { createClient } = require("redis");

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://app:app@localhost:5432/orders"
});

const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});

async function init() {
  await redis.connect();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(100) NOT NULL,
      product_id VARCHAR(100) NOT NULL,
      quantity INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  app.listen(process.env.PORT || 4002, "0.0.0.0", () =>
    console.log("Order service running")
  );
}

app.get("/health", async (_, res) => {
  try {
    await pool.query("SELECT 1");
    await redis.ping();
    res.json({ service: "order-service", status: "ok" });
  } catch {
    res.status(503).json({ service: "order-service", status: "unhealthy" });
  }
});

app.post("/orders", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) {
    return res.status(400).json({ error: "userId, productId and quantity are required" });
  }

  const result = await pool.query(
    "INSERT INTO orders(user_id, product_id, quantity) VALUES($1,$2,$3) RETURNING *",
    [userId, productId, quantity]
  );

  res.status(201).json(result.rows[0]);
});

init().catch(err => {
  console.error(err);
  process.exit(1);
});
