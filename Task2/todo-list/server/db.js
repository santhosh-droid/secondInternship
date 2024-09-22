const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/'; 
const client = new MongoClient(uri);

let db;
const connectDB = async () => {
  try {
    await client.connect();
    db = client.db('Todo-list'); 
    console.log('Connected to MongoDB');
    await db.createCollection('tasks');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
};

module.exports = { connectDB, getDB };
