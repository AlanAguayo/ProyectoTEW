const mongoose = require("mongoose");
const Category = require("../models/CategoryModel.js");

const save = async (req, res) => {
    const newCategory = new Category(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (err) {
        res.status(500).json(err);
    }
};

//UPDATE
const update = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        console.log('Categoría actualizada:', updatedCategory);

        if (!updatedCategory) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(500).json(err);
    }
};
  
  //DELETE
const drop = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json("Category has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
};
  
  //GET Category
const findOne = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json(err);
    }
};
  
  //GET ALL PRODUCTS
  const findAll = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let categories;
  
      if (qNew) {
        categories = await Category.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        categories = await Category.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        categories = await Category.find();
      }
  
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  module.exports = {findAll, findOne, save, update, drop};
  