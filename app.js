const express = require("express");
const { products } = require("./data");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Home page</h1><a href='/api/products'>Products</a>");
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get("/api/products/:pid", (req, res) => {
  const singleProducts = products.find(
    (product) => product.id == req.params.pid
  );
  if (!singleProducts) {
    return res.status(404).send("Product not found");
  }
  return res.json(singleProducts);
});

app.listen(3000);
