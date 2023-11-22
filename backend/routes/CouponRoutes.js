const express = require("express");


const router = express.Router();

const couponController = require("../controllers/CouponController.js");

const guard = require("express-jwt-permissions")();
router.get('/', guard.check("user:read"), couponController.findAll);

router.get('/:id', couponController.findOne);

router.post('/', guard.check("user:write"),couponController.save);

router.put('/:id', couponController.update);

router.delete('/:id', couponController.drop);

module.exports = router;