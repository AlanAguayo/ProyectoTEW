const express = require("express");
const checkAuth = require("../Middleware/auth");
const checkRole = require("../Middleware/roleAuth");

const router = express.Router();

const categoryController = require("../controllers/CategoryController.js");

router.get('/', categoryController.findAll);

router.get('/:id', categoryController.findOne);

router.post('/',checkAuth,checkRole,categoryController.save);

router.put('/:id',checkAuth,checkRole, categoryController.update);

router.delete('/:id',checkAuth,checkRole, categoryController.drop);

module.exports = router;