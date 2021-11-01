const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
