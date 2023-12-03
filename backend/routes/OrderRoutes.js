const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController.js");
const checkAuth = require("../Middleware/auth");
const checkRole = require("../Middleware/roleAuth");

router.get('/',checkAuth,checkRole, orderController.findAll);

router.get('/find/:userId',checkAuth, orderController.findOne);

router.get('/:id',checkAuth, orderController.findOneById);

router.post('/',checkAuth, orderController.save);

router.put('/:id',checkAuth, orderController.update);

router.delete('/:id',checkAuth, orderController.drop);

router.get('/income',checkAuth, orderController.findIncome);

module.exports = router;