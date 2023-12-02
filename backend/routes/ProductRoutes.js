const express = require("express");
const router = express.Router();

const checkAuth = require("../Middleware/auth");
const checkRole = require("../Middleware/roleAuth");

const productController = require("../controllers/ProductController.js");

router.get('/', productController.findAll);

router.get('/:id', productController.findOne);

router.post('/',checkAuth,checkRole, productController.save);

router.put('/:id',checkAuth,checkRole, productController.update);

router.delete('/:id',checkAuth,checkRole, productController.drop);

module.exports = router;