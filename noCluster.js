import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/slow-page", (req, res) => {
  for (let i = 0; i < 6000000000; i++) {}
  res.send("Slow Page");
});

app.listen(PORT, () => {
  console.log(`server is up`);
});
