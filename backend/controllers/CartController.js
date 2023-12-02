const Cart = require("../models/CartModel");

const router = require("express").Router();

//CREATE

const save = ( async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
const update = ( async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
const drop = ( async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
const findOne = ( async (req, res) => {
  
  try {
    console.log("Si pasa");
    const cart = await Cart.findOne({ userId: req.params.userId });
    console.log("Hola?");
    res.status(200).json(cart);
  } catch (err) {
    console.log("No pasa");
    res.status(500).json(err);
  }
});

//GET ALL

const findAll = ( async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {findAll, findOne, save, update, drop};