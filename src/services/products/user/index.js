const express = require("express");
const mongoose = require("mongoose");
const User = require("./schema");
const userRoute = express.Router();

userRoute.post("/", async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    if (newUser) {
      res.status(201).send(newUser);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
userRoute.get("/", async (req, res, next) => {
  try {
    const Users = await User.find();

    if (Users) {
      res.status(201).send(Users);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = userRoute;

/*

route.get("/", async (req, res, next) => {
  try {
    const artics = await Article.find();

    res.status(201).send(artics);
  } catch (error) {
    console.log(error);
  }
});



*/
