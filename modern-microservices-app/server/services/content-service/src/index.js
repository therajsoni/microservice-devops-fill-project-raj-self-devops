const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4003;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/contentdb";

const Content = mongoose.model("Content", new mongoose.Schema({
  title: {type:String, required:true},
  body: {type:String, default:""},
  createdAt: {type:Date, default:Date.now}
}));

app.get("/health",(req,res)=>res.json({service:"content-service",database:"mongodb",status:"ok"}));
app.get("/", async (req,res)=>{
  try { res.json(await Content.find().sort({createdAt:-1}).limit(20)); }
  catch(e){res.status(500).json({error:e.message});}
});
app.post("/", async (req,res)=>{
  try { const item = await Content.create(req.body); res.status(201).json(item); }
  catch(e){res.status(400).json({error:e.message});}
});

mongoose.connect(MONGO_URL).then(()=>{
  app.listen(PORT,()=>console.log(`Content service running on ${PORT}`));
}).catch(err=>console.error(err));
