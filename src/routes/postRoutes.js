const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new blog post
router.post('/', authMiddleware, postController.createPost);

// Get all blog posts
router.get('/', postController.getPosts);

// Get a single blog post by ID
router.get('/:id', postController.getPostById);

// Update a blog post
router.put('/:id', authMiddleware, postController.updatePost);

// Delete a blog post
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
