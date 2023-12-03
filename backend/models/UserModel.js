const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    birthday: String,
    phone: Number,
    address: String,
    isAdmin: Boolean,
    img: String ,
  },
  { 
    timestamps: true,
    collection: 'users'
  }
);

module.exports = mongoose.model("User", UserSchema);
