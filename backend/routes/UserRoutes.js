
const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController.js");

router.get('/', userController.findAll);

router.get('/find/:id', userController.findOne);

router.get('/stats', userController.stats);

router.put('/:id', userController.update);

router.delete('/:id', userController.drop);

module.exports = router;