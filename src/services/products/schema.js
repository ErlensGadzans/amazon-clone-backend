const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: String, //REQUIRED
    description: String, //REQUIRED
    brand: String, //REQUIRED
    imageUrl: String, //REQUIRED
    price: Number, //REQUIRED
    category: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);

/**
 * WE CAN ADD A LITTLE TIMESTAMP BY CREATING A SUBSCHEMA IN OUR REVIEW
 */
