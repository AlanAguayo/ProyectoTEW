const express = require("express");
const router = express.Router();

const productController = require("../controllers/ProductController.js");

router.get('/', productController.findAll);

router.get('/:id', productController.findOne);

router.post('/', productController.save);

router.put('/:id', productController.update);

router.delete('/:id', productController.drop);

module.exports = router;