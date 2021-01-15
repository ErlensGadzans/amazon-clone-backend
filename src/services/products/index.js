const { Router } = require("express");
const express = require("express");
const ProductModel = require("./schema");
const mongoose = require("mongoose");
const { findByIdAndUpdate } = require("./schema");

const productsRouter = express.Router();

//ADDING NEW PRODUCT

productsRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = new ProductModel(req.body); //1) Requesting info from body
    await newProduct.save(); // 2) Saving new info about the product
    res.status(201).send("Product has been added!");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//GETTING ALL THE PRODUCTS
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductModel.find(); //1) Requesting info about the products
    res.send(products); //2) Receiving products data
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//GETTING the Specific THE PRODUCTS

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (product) {
      res.status(204).send("Product has been deleted!");
    } else {
      const error = new Error();
      error.httpStatusCode = 404;
    }
    next(error); //i dont know why, error is not defined
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRouter.put("/:id", async (req, res, next) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(204).send("Product has been edited.");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = productsRouter;
