const express = require("express");
const mongoose = require("mongoose");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const {
  badRequestHandler,
  notFoundHandler,
  forbiddenHandler,
  notAuthorized,
  genericErrorHandler,
} = require("./errorHandlers");
const productsRouter = require("./services/products");
const userRoute = require("./services/products/user/index");

const server = express();

/* ADDED A CHANGE !!! */

const port = process.env.PORT || 5077;

server.use(express.json());
server.use(cors());

server.use("/products", productsRouter);
server.use("/user", userRoute);

server.get("/", (req, res, next) => {
  res.send("Richards & Erlens server is running!");
});

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(forbiddenHandler);
server.use(notAuthorized);
server.use(genericErrorHandler);

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

console.log(listEndpoints(server));
