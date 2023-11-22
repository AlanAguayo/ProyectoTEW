const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
  {
    code:String,
    discount: {
        type: Number,
        min: 0,
        max: 1,
    },
  },
  { 
    timestamps: true,
    collection: 'coupons'
  }
);

module.exports = mongoose.model("Coupons", CouponSchema);
