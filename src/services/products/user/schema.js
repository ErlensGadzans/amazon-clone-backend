const { Schema, model, Mongoose } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: [18, "Purchase should be dona from an adult!!!"],
      required: true,
    },
    cart: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);

/**
 *   {
    "name": "Richard Johnson",
    "surname": "Addai",
    "email": "studentrichard4@gmail.com",
    "age": 18,
    "cart": []
  }


  
 */
