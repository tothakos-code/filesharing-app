const Content = require('../models/content.model');

module.exports.getAllContent = async (req, res) => {
    const { search = '', category, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (search) {
        filters.title = { $regex: search, $options: 'i' };
    }
    if (category) {
        filters.category = category;
    }

    try {
        const contents = await Content.find(filters)
            .populate('category')
            .skip((+page - 1) * +limit)
            .limit(+limit)
            .sort({ createdAt: -1 });

        const total = await Content.countDocuments(filters);

        res.json({
            data: contents,
            total,
            page: +page,
            limit: +limit,
            totalPages: Math.ceil(total / +limit)
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch content.' });
    }
};


module.exports.getContentById = (req, res) => {
    Content.findById(req.params.contentId)
        .populate('category uploadedBy ratings.user')
        .then((content) => {
            if (!content) {
                return res.status(404).json({ message: 'Content not found.' });
            }
            res.status(200).json(content);
        })
        .catch(() => {
            res.status(500).json({ message: 'Internal server error.' });
        });
};


module.exports.updateContent = (req, res) => {
    Content.findByIdAndUpdate(req.params.contentId, req.body, { new: true })
        .then((content) => { res.status(200).json(content); })
        .catch(() => { res.status(500).json({ message: 'Internal server error.' }); });
};

module.exports.createContent = async (req, res) => {
    const { title, description, category } = req.body;
    const file = req.file;

    if (!file || !title || !category) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    try {
        const newContent = new Content({
            title,
            description,
            category,
            filePath: file.path,
            uploadedBy: req.user.userId,
        });

        await newContent.save();
        res.status(201).json(newContent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports.deleteContent = (req, res) => {
    Content.findByIdAndDelete(req.params.catId)
        .then(() => { res.status(204).json(); })
        .catch(() => { res.status(500).json({ message: 'Internal server error.' }); });
};

module.exports.rateContent = async (req, res) => {
    const userId = req.user.userId; // assuming user ID is available via JWT middleware
    const contentId = req.params.id;
    const { rating } = req.body;

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    try {
        const content = await Content.findById(contentId);
        if (!content) return res.status(404).json({ message: 'Content not found' });

        const existingRating = content.ratings.find(r => r.user?.toString() === userId);
        if (existingRating) {
            // Update user's rating
            console.log("updating");
            existingRating.value = rating;
        } else {
            // Add new rating
            console.log("adding");
            content.ratings.push({ user: userId, value: rating });
        }

        // Recalculate average
        const total = content.ratings.reduce((sum, r) => sum + r.value, 0);
        content.ratingsCount = content.ratings.length;
        content.averageRating = total / content.ratingsCount;

        await content.save();
        res.status(200).json({ message: 'Rating submitted', average: content.averageRating });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving rating' });
    }
};