const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments.controller');
const isAuthenticated = require('../middleware/isAuthenticated');
const isAdmin = require('../middleware/isAdmin');

// /api/comments/:contentId
router.get('/:contentId', commentController.getComments);
router.post('/:contentId', isAuthenticated, commentController.createComment);
router.delete('/:commentId', isAuthenticated, commentController.deleteComment);
router.put('/moderate/:commentId', isAuthenticated, isAdmin, commentController.moderateComment);

module.exports = router;
