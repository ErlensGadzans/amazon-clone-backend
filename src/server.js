const express = require("express");
const mongoose = require("mongoose");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const server = express();

const port = process.env.PORT || 5077;

server.use(express.json());

server.get("/", (req, res, next) => {
  res.send("Richards & Erlens server is running!");
});

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("This server is running on port:" + port);
    })
  )
  .catch((error) => console.log(error));
