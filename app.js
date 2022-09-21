const express = require("express");
const path = require("node:path");

const app = express();

app.use(express.static("./navbar-app"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(3000);
