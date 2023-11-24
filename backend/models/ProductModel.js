const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true},
    desc: { type: String, required: true},
    category:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      require: false
    },
    size: {type: Array, required: true} ,
    color: {type: Array, required: true},
    price: {type: Number, required: true},
    image: {type: [String], required: true},
  },
  { 
    timestamps: true,
    collection: 'products' 
  }
);

module.exports = mongoose.model("Product", ProductSchema);
