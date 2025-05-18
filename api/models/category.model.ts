const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});

CategorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Category', CategorySchema);
