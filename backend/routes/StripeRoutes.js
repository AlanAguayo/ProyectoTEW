const express = require("express");
const router = express.Router();

const stripeController = require("../controllers/StripeController.js");
const checkAuth = require("../Middleware/auth");
const checkRole = require("../Middleware/roleAuth");

router.get('/payment',checkAuth,checkRole, stripeController.payment);

module.exports = router;
