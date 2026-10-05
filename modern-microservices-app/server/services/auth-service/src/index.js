const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4001;
const SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

app.get("/health", (req,res)=>res.json({service:"auth-service",status:"ok"}));

app.post("/login", async (req,res)=>{
  const { email = "demo@example.com", password = "demo123" } = req.body || {};
  const hash = await bcrypt.hash("demo123", 10);
  const valid = email === "demo@example.com" && await bcrypt.compare(password, hash);
  if (!valid) return res.status(401).json({message:"Invalid credentials"});
  const token = jwt.sign({email}, SECRET, {expiresIn:"1h"});
  res.json({token});
});

app.listen(PORT, ()=>console.log(`Auth service running on ${PORT}`));
