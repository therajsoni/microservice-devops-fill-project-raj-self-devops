const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const services = {
  auth: process.env.AUTH_SERVICE_URL || "http://localhost:4001",
  users: process.env.USER_SERVICE_URL || "http://localhost:4002",
  content: process.env.CONTENT_SERVICE_URL || "http://localhost:4003",
  analytics: process.env.FASTAPI_SERVICE_URL || "http://localhost:8000"
};

app.get("/api/health", (req, res) => res.json({ service: "api-gateway", status: "ok" }));

app.use("/api/auth", async (req, res) => proxy(req, res, services.auth, req.path));
app.use("/api/users", async (req, res) => proxy(req, res, services.users, req.path));
app.use("/api/content", async (req, res) => proxy(req, res, services.content, req.path));
app.use("/api/analytics", async (req, res) => proxy(req, res, services.analytics, req.path));

async function proxy(req, res, base, path) {
  try {
    const response = await axios({
      method: req.method,
      url: `${base}${path}`,
      data: req.body,
      headers: { authorization: req.headers.authorization || "" }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 502;
    res.status(status).json(error.response?.data || { error: "Service unavailable" });
  }
}

app.listen(PORT, () => console.log(`API Gateway running on ${PORT}`));
