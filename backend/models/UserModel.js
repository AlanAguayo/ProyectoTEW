const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    img: String ,
  },
  { 
    timestamps: true,
    collection: 'users'
  }
);

module.exports = mongoose.model("User", UserSchema);
