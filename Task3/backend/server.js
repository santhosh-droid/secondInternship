const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const postRoutes = require('./routes/postRoutes');

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
