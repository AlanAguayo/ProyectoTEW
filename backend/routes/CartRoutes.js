const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController.js");
const checkAuth = require("../Middleware/auth");
const checkRole = require("../Middleware/roleAuth");

router.get('/',checkAuth ,checkRole, cartController.findAll);

router.get('/:userId',checkAuth,cartController.findOne);

router.post('/',checkAuth, cartController.save);

router.put('/:id',checkAuth , cartController.update);

router.delete('/:id',checkAuth, cartController.drop);

module.exports = router;