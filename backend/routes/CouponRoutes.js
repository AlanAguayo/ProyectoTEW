const express = require("express");


const router = express.Router();

const couponController = require("../controllers/CouponController.js");

router.get('/', couponController.findAll);

router.get('/:id', couponController.findOne);

router.post('/',couponController.save);

router.put('/:id', couponController.update);

router.delete('/:id', couponController.drop);

module.exports = router;