const express = require("express");

const router = express.Router();

const sliderController = require("../controllers/SliderController.js");

router.get('/', sliderController.findAll);

router.get('/:id', sliderController.findOne);

router.post('/',sliderController.save);

router.put('/:id', sliderController.update);

router.delete('/:id', sliderController.drop);

module.exports = router;