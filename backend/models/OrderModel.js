const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  { 
    userId:  String,
    products: [
      {
        productId: String,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: Number,
    address: String,
    status: String,
  },
  { 
    timestamps: true,
    collection: 'orders'
  }
);

module.exports = mongoose.model("Order", OrderSchema);
