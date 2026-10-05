const express = require("express");

const app = express();
app.use(express.json());

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || "http://localhost:4001";
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || "http://localhost:4002";

app.get("/health", (_, res) => res.json({ service: "api-gateway", status: "ok" }));

app.get("/api/products", async (_, res) => {
  try {
    const response = await fetch(`${PRODUCT_SERVICE_URL}/products`);
    res.status(response.status).json(await response.json());
  } catch {
    res.status(503).json({ error: "Product service unavailable" });
  }
});

app.get("/api/orders/health", async (_, res) => {
  try {
    const response = await fetch(`${ORDER_SERVICE_URL}/health`);
    res.status(response.status).json(await response.json());
  } catch {
    res.status(503).json({ error: "Order service unavailable" });
  }
});

app.listen(process.env.PORT || 4000, "0.0.0.0", () =>
  console.log("API Gateway running")
);
