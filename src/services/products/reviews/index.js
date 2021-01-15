const express = require("express");

const Review = require("./schema");

const reviewsRouter = express.Router();

reviewsRouter.post("/", async (req, res, next) => {
  try {
    const newReview = new Review(req.body);
    const { _id } = await newReview.save();
    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewsRouter.get("/", async (req, res, next) => {
  try {
    const review = await Review.find();

    res.status(201).send(review);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewsRouter.delete("/:reviewId", async (req, res, next) => {
  try {
    const reviewDeleted = await Review.findByIdAndDelete(req.params.reviewId);
    res.status(204).send(reviewDeleted);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewsRouter.put("/:reviewId", async (req, res, next) => {
  try {
    const reviewWhitchWillBeEdited = await Review.findByIdAndUpdate(
      req.params.reviewId,
      req.body,
      { runValidators: true, new: true }
    );

    res.status(204).send(reviewWhitchWillBeEdited);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = reviewsRouter;
