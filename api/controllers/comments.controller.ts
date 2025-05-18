const Comment = require('../models/comment.model');

// Create a comment
exports.createComment = async (req, res) => {
    const { text } = req.body;
    const userId = req.user.userId;
    const contentId = req.params.contentId;

    if (!text) return res.status(400).json({ message: 'Comment text is required.' });

    try {
        const comment = new Comment({ content: contentId, user: userId, text });
        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Failed to save comment.' });
    }
};

// List comments for a content
exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ content: req.params.contentId })
            .populate('user', 'firstname lastname')
            .sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch comments.' });
    }
};

// Delete a comment (by admin or owner)
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found.' });

        const isAdmin = req.user.role === 'admin';
        const isOwner = comment.user.toString() === req.user.id;

        if (!isAdmin && !isOwner) {
            return res.status(403).json({ message: 'Not authorized to delete this comment.' });
        }

        await Comment.findByIdAndDelete(comment._id);
        res.json({ message: 'Comment deleted.' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting comment.' });
    }
};

// Admin moderation toggle
exports.moderateComment = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admin can moderate comments.' });
        }

        const comment = await Comment.findById(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found.' });

        comment.moderated = !comment.moderated;
        await comment.save();

        res.json({ message: 'Comment moderation status updated.', moderated: comment.moderated });
    } catch (err) {
        res.status(500).json({ message: 'Moderation failed.' });
    }
};
