const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  { 
    userId:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          require: true
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: Number,
    address: String,
    status: String,
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coupon',
      require: true
    },
  },
  { 
    timestamps: true,
    collection: 'orders'
  }
);

module.exports = mongoose.model("Order", OrderSchema);
