const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4002;
const pool = new Pool({connectionString: process.env.DATABASE_URL || "postgresql://app:app@localhost:5432/appdb"});

app.get("/health", (req,res)=>res.json({service:"user-service",database:"postgresql",status:"ok"}));

app.get("/", async (req,res)=>{
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(180) UNIQUE NOT NULL
    )`);
    const result = await pool.query("SELECT id,name,email FROM users ORDER BY id DESC");
    res.json(result.rows);
  } catch(e) {
    res.status(500).json({error:e.message});
  }
});

app.post("/", async (req,res)=>{
  const {name,email} = req.body;
  if(!name || !email) return res.status(400).json({message:"name and email are required"});
  try {
    const result = await pool.query("INSERT INTO users(name,email) VALUES($1,$2) RETURNING id,name,email",[name,email]);
    res.status(201).json(result.rows[0]);
  } catch(e) {
    res.status(400).json({error:e.message});
  }
});

app.listen(PORT,()=>console.log(`User service running on ${PORT}`));
