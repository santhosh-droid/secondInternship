// backend/config/db.js
const { MongoClient } = require('mongodb');

let db;

const connectDB = async () => {
  try {
    // Use MongoClient to connect to MongoDB (replace with your MongoDB URL)
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017/blogging_platform');
    
    // Set the database instance
    db = client.db(); // This uses the 'blogging_platform' database

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process if the database connection fails
  }
};

// Function to get the database instance
const getDB = () => db;

module.exports = {
  connectDB,
  getDB,
};
