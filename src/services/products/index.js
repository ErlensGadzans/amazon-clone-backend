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

//REVIEWS

productsRouter.get("/:id/reviews", async (req, res, next) => {
  try {
    const reviews = await ProductModel.findById(req.params.id);
    res.status(200).send(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRouter.get("/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    const { reviews } = await ProductModel.findOne(
      { _id: mongoose.Types.ObjectId(req.params.id) }, //using mangoose to find object by id
      {
        reviews: {
          $elemMatch: { _id: mongoose.Types.ObjectId(req.params.reviewId) },
        },
      }
    );
    res.status(200).send(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRouter.post("/:id/reviews", async (req, res, next) => {
  try {
    const review = req.body;
    const newReview = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { reviews: review },
      },
      { runValidators: true, new: true }
    );
    res.status(201).send({ newReview });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRouter.delete("/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    const { reviews } = await ProductModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        $pull: {
          reviews: { _id: mongoose.Types.ObjectId(req.params.reviewId) },
        },
      }
    );
    res.status(204).send(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRouter.put("/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    const product = await ProductModel.findOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        reviews: {
          $elemMatch: { _id: mongoose.Types.ObjectId(req.params.reviewId) },
        },
      }
    );

    const reviewIndex = product.reviews.findIndex(
      (review) => review._id.toString() === req.params.reviewId
    );

    const reviewInArray = product.reviews[reviewIndex];

    const updatedReview = { ...reviewInArray._doc, ...req.body };

    product.reviews[reviewIndex] = updatedReview;

    await product.update({ reviews: product.reviews });
    res.status(204).send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = productsRouter;
