const express = require("express");
const checkAuth = require("../Middleware/auth");
const checkRole = require("../Middleware/roleAuth");


const router = express.Router();

const couponController = require("../controllers/CouponController.js");

router.get('/', couponController.findAll);

router.get('/:id', couponController.findOne);

router.post('/',checkAuth,checkRole,couponController.save);

router.put('/:id',checkAuth,checkRole, couponController.update);

router.delete('/:id',checkAuth,checkRole, couponController.drop);

module.exports = router;