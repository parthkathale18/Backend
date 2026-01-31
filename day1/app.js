const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Backend Day1 running 🚀");
});

app.get("/contact", (req, res) => {
  res.send("contact page 🚀");
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
