const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/products";
const client = new MongoClient(uri);
let collection;

async function init() {
  await client.connect();
  const db = client.db();
  collection = db.collection("products");

  if (await collection.countDocuments() === 0) {
    await collection.insertMany([
      { name: "Laptop", price: 55000 },
      { name: "Keyboard", price: 2500 },
      { name: "Mouse", price: 1200 }
    ]);
  }

  app.listen(process.env.PORT || 4001, "0.0.0.0", () =>
    console.log("Product service running")
  );
}

app.get("/health", (_, res) => res.json({ service: "product-service", status: "ok" }));

app.get("/products", async (_, res) => {
  try {
    const products = await collection.find({}).toArray();
    res.json(products.map(p => ({
      id: p._id.toString(),
      name: p.name,
      price: p.price
    })));
  } catch {
    res.status(500).json({ error: "Database error" });
  }
});

init().catch(err => {
  console.error(err);
  process.exit(1);
});
