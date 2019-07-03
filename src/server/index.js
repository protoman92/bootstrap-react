const { config } = require("dotenv");
const express = require("express");
const fs = require("fs");
const https = require("https");
const app = express();

config({});
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

const port = process.env.PORT || 8000;

https
  .createServer(
    {
      key: fs.readFileSync("src/server/server.key"),
      cert: fs.readFileSync("src/server/server.cert")
    },
    app
  )
  .listen(port, () => {
    console.info(`Server listening to port ${port}`);
  });
