const express = require("express");
const router = express.Router();

const stripeController = require("../controllers/StripeController.js");

router.get('/payment', stripeController.payment);

module.exports = router;
