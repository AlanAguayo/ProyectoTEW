const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController.js");

router.get('/', cartController.findAll);

router.get('/:userId', cartController.findOne);

router.post('/', cartController.save);

router.put('/:id', cartController.update);

router.delete('/:id', cartController.drop);

module.exports = router;