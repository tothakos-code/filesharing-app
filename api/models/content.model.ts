const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const contentSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    filePath: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    ratings: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            value: { type: Number, min: 1, max: 5 }
        }
    ],

    averageRating: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 }
});

contentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Content', contentSchema);