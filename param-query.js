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
    (product) => product.id === Number(req.params.pid)
  );
  if (!singleProducts) {
    return res.status(404).send("Product not found");
  }
  return res.json(singleProducts);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limits } = req.query;
  let sortedProducts = [...products];
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if (limits) {
    sortedProducts = sortedProducts.slice(0, Number(limits));
  }
  if (sortedProducts.length < 1) {
    // res.status(200).send("No products matched the query");
    return res.status(200).json({ success: true, data: [] });
  }
  res.status(200).json(sortedProducts);
});

app.listen(3000);
