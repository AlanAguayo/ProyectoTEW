const mongoose = require('mongoose');

const SliderSchema = new mongoose.Schema({
    id: Number,
    img: String,
    title: String,
    desc: String,
    bg: String
},
{
    collection: 'slider'
});

const slider = mongoose.model('Slider', SliderSchema);

module.exports = slider;