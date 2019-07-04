const initializeDB = require("./mongo/database");
const { config } = require("dotenv");
const express = require("express");
const fs = require("fs");
const https = require("https");
const app = express();
const createClient = require("./client");
const createUserRouter = require("./route/user");

config({});
app.use(express.json());
app.get("/", (req, res) => res.status(200).send("Hello world"));

const client = createClient();
const userRouter = createUserRouter(express.Router(), client);
app.use("/user", userRouter);

const port = process.env.PORT || 8000;

async function initialize() {
  await initializeDB();

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
}

initialize();
