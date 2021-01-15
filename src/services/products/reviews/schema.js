const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema(
  {
    comment: String,
    rate: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Review", ReviewSchema);
