const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: String
},
{
    collection: 'categories'
});

const category = mongoose.model('Category', CategorySchema);

module.exports = category;