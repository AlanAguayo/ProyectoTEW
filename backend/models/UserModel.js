const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    lastName: String,
    email: String,
    password: String,
    birthday: String,
    phone: Number,
    address: String,
    isAdmin: Boolean,
    img: String ,
    country: String,
    street: String,
    city: String,
    state: String,
    cp: Number
  },
  { 
    timestamps: true,
    collection: 'users'
  }
);

module.exports = mongoose.model("User", UserSchema);
