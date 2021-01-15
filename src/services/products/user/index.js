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

userRoute.post("/:id/add-to-cart/:id2", async (req, res, next) => {
  try {
    const User = await User.findByIdAndUpdate(req.params.id, {
      $addToSet: { cart: req.params.id2 },
    });
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

userRoute.get("/:id", async (req, res, next) => {
  try {
    const specificUser = await User.findById(req.params.id).populate("cart");

    if (specificUser) {
      res.status(201).send(specificUser);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRoute.put("/:id", async (req, res, next) => {
  try {
    const modifiedUsers = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
        useFindAndModify: false,
      }
    );

    if (modifiedUsers) {
      res.status(201).send(modifiedUsers);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRoute.delete("/:id", async (req, res, next) => {
  try {
    const deleteUser = await User.findOneAndDelete(req.params.id);

    if (deleteUser) {
      res.status(201).send(deleteUser);
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
