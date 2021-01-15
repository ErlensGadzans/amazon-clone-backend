const { Router } = require("express");
const express = require("express");
const ProductModel = require("./schema");
const mongoose = require("mongoose");

const productsRouter = express.Router();

//ADDING NEW PRODUCT

productsRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).send("Product has been added!");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = productsRouter;
