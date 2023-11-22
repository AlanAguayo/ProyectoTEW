const mongoose = require("mongoose");
const Coupon = require("../models/CouponModel.js");


const save = async (req, res) => {
    const newCoupon = new Coupon(req.body);
    try {
        const savedCoupon = await newCoupon.save();
        res.status(200).json(savedCoupon);
    } catch (err) {
        res.status(500).json(err);
    }
};

//UPDATE
const update = async (req, res) => {
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        console.log('Cupón actualizada:', updatedCoupon);

        if (!updatedCoupon) {
            return res.status(404).json({ error: 'Cupón no encontrado' });
        }
        res.status(200).json(updatedCoupon);
    } catch (err) {
        res.status(500).json(err);
    }
};
  
  //DELETE
const drop = async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id);
        res.status(200).json("Coupon has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
};
  
  //GET Coupon
const findOne = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        res.status(200).json(coupon);
    } catch (err) {
        res.status(500).json(err);
    }
};
  
  //GET ALL PRODUCTS
  const findAll = async (req, res) => {
    const qNew = req.query.new;
    const qCoupon = req.query.coupon;
    try {
      let coupons;
  
      if (qNew) {
        coupons = await Coupon.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCoupon) {
        coupons = await Coupon.find({
          coupons: {
            $in: [qCoupon],
          },
        });
      } else {
        coupons = await Coupon.find();
      }
  
      res.status(200).json(coupons);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  module.exports = {findAll, findOne, save, update, drop};