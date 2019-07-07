const initializeDB = require("./mongo/database");
const { config } = require("dotenv");
const express = require("express");
const fs = require("fs");
const https = require("https");
const app = express();
const createClient = require("./client");
const createRouter = require("./route");

config({});
app.use(express.json());
app.get("/", (req, res) => res.status(200).send("Hello world"));

const client = createClient();
app.use(createRouter(express.Router(), client));

const port = process.env.PORT || 8000;

async function initialize() {
  await initializeDB();

  https
    .createServer(
      {
        key: fs.readFileSync("src/server.key"),
        cert: fs.readFileSync("src/server.cert")
      },
      app
    )
    .listen(port, () => {
      console.info(`Server listening to port ${port}`);
    });
}

initialize();
