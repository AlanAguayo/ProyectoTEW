
const express = require("express");
const router = express.Router();

const checkAuth = require("../Middleware/auth");
const checkRole = require("../Middleware/roleAuth");


const userController = require("../controllers/UserController.js");

router.get('/',checkAuth,checkRole, userController.findAll);

router.get('/find/:id',checkAuth, userController.findOne);

router.get('/stats',checkAuth, userController.stats);

router.put('/:id',checkAuth, userController.update);

router.delete('/:id',checkAuth, userController.drop);

module.exports = router;