const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/CategoryController.js");

router.get('/', categoryController.findAll);

router.get('/:id', categoryController.findOne);

router.post('/',categoryController.save);

router.put('/:id', categoryController.update);

router.delete('/:id', categoryController.drop);

module.exports = router;