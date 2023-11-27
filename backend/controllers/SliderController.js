const Slider = require("../models/SliderModel");

const router = require("express").Router();

//CREATE

const save = ( async (req, res) => {
  const newSlider = new Slider(req.body);

  try {
    const savedSlider = await newSlider.save();
    res.status(200).json(savedSlider);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
const update = ( async (req, res) => {
  try {
    const updatedSlider = await Slider.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedSlider);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
const drop = ( async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.params.id);
    res.status(200).json("Slider has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
const findOne = ( async (req, res) => {
  try {
    const slider = await Slider.findOne({ id: req.params.id });
    res.status(200).json(slider);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL

const findAll = ( async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.status(200).json(sliders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {findAll, findOne, save, update, drop};