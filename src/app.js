const express = require('express');
const dotenv = require('dotenv');
const db = require('./utils/db');
const port = process.env.PORT || 3000;
authRoutes = require('./routes/authRoutes');
dotenv.config(); // Load environment variables

const app = express();

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
