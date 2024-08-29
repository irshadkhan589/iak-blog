const express = require('express');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new comment
router.post('/', authMiddleware, commentController.createComment);

// Get all comments for a specific post
router.get('/post/:postId', commentController.getCommentsByPost);

// Update a comment
router.put('/:id', authMiddleware, commentController.updateComment);

// Delete a comment
router.delete('/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
