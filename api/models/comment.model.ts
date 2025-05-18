const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const commentSchema = new mongoose.Schema({
    content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    moderated: { type: Boolean, default: false }
});

commentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Comment', commentSchema);