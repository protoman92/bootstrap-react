const initializeDB = require("./mongo/database");
const {
  createHTTPClient
} = require("bootstrap-nodejs-essentials/dist/http/client");
const { config } = require("dotenv");
const express = require("express");
const fs = require("fs");
const https = require("https");
const app = express();
const createRouter = require("./route");

config({});
app.use(express.json());

const client = createHTTPClient();
app.use("/api", createRouter(express.Router(), client));

const port = process.env.PORT || 8000;

async function initialize() {
  await initializeDB();

  if (process.env.NODE_ENV !== "production") {
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
  } else {
    app.listen(port, () => console.log(`Server listing to port ${port}`));
  }
}

initialize();
