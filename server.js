require('dotenv').config();
const express = require('express');
const dbConnect = require('./config/db');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database Connection
dbConnect();

// Routes
app.use('/api/quizzes', quizRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
