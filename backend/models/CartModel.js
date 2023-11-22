const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId:String,
    products: [
      {
        productId:  String,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { 
    timestamps: true,
    collection: 'carts'
  }
);

module.exports = mongoose.model("Cart", CartSchema);
