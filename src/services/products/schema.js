const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: String, //REQUIRED
    description: String, //REQUIRED
    brand: String, //REQUIRED
    imageUrl: String, //REQUIRED
    price: Number, //REQUIRED
    category: String,
    reviews: [
      {
        comment: String,
        rate: Number,
      },
      {
        timestamps: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
