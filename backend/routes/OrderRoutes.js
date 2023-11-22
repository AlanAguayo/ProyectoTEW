const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController.js");

router.get('/', orderController.findAll);

router.get('/find/:userId', orderController.findOne);

router.post('/', orderController.save);

router.put('/:id', orderController.update);

router.delete('/:id', orderController.drop);

router.get('/income', orderController.findIncome);

module.exports = router;