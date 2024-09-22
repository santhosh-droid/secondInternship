const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./db'); // Keep this to connect to MongoDB
const taskRoutes = require('./routes/tasks'); // Import your routes

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Use the task routes
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
