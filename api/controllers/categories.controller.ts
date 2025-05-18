const Category = require('../models/category.model');

module.exports.getAllCategory = (req, res) => {
    Category.find({})
        .then((categories) => { res.status(200).json(categories); })
        .catch(() => { res.status(500).json({ message: 'Internal server error.' }); });
};

module.exports.updateCategory = (req, res) => {
    Category.findByIdAndUpdate(req.params.catId, req.body, { new: true })
        .then((cat) => { res.status(200).json(cat); })
        .catch(() => { res.status(500).json({ message: 'Internal server error.' }); });
};

module.exports.createCategory = (req, res) => {
    Category.findOne(req.body)
        .then((category) => {
            if (category) return res.status(409).json({ message: 'Category already exists' });
            const newCategory = new Category(req.body)
            newCategory.save()
            res.status(201).json(newCategory);
        })
        .catch(() => { res.status(500).json({ message: 'Internal server error.' }); });
};

module.exports.deleteCategory = (req, res) => {
    Category.findByIdAndDelete(req.params.catId)
        .then(() => { res.status(204).json(); })
        .catch(() => { res.status(500).json({ message: 'Internal server error.' }); });
};