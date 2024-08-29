const express = require('express');
const dotenv = require('dotenv');
const db = require('./utils/db');
const port = process.env.PORT || 3000;
const rateLimit = require('express-rate-limit');
const serverless = require('serverless-http');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
authRoutes = require('./routes/authRoutes');
dotenv.config(); // Load environment variables

const app = express();

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 requests per windowMs
    message: 'Too many requests from this IP, please try again after a minute'
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Middleware to parse JSON
app.use(express.json());

// Connect to the database
db.connect();

// Basic route for health check
app.get('/', (req, res) => {
    res.send('Blog API is running...');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); // Use the post routes
app.use('/api/comments', commentRoutes); // Use the comment routes

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports.handler = serverless(app);
