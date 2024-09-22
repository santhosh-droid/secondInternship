const express = require('express');
const { getDB } = require('../db'); // Import the getDB function
const ObjectId = require('mongodb').ObjectId;

const router = express.Router();

// Create a new task
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  const db = getDB();

  try {
    const result = await db.collection('tasks').insertOne({ name, description, completed: false });
    console.log('Task added:', result.insertedId);
    res.status(201).json({ _id: result.insertedId, name, description, completed: false });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Error creating task' });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  const db = getDB();

  try {
    const tasks = await db.collection('tasks').find({}).toArray();
    console.log('Fetched tasks:', tasks);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const db = getDB();

  try {
    await db.collection('tasks').updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, description } }
    );
    const updatedTask = await db.collection('tasks').findOne({ _id: new ObjectId(id) }); // Fetch the updated task
    res.status(200).json(updatedTask); // Return the updated task
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Error updating task' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const db = getDB();

  try {
    const result = await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });
    console.log(`Task deleted: ${id}`);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Error deleting task' });
  }
});

module.exports = router;
