const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// Get all posts
const getAllPosts = async (req, res) => {
  const db = getDB();
  try {
    const posts = await db.collection('posts').find().toArray();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Unable to fetch posts' });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  const db = getDB();
  const { id } = req.params;
  try {
    const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch the post' });
  }
};

// Create a new post
const createPost = async (req, res) => {
  const db = getDB();
  const { title, content } = req.body;

  // Check if title and content are provided
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const newPost = { title, content, createdAt: new Date() };
    const result = await db.collection('posts').insertOne(newPost);
    
    // The inserted post can be accessed directly through result.insertedId
    const insertedPost = { ...newPost, _id: result.insertedId }; // Include the new _id in the response

    res.status(201).json(insertedPost); // Send back the created post
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Unable to create post' });
  }
};

// Update a post
const updatePost = async (req, res) => {
  const db = getDB();
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPost = { title, content, updatedAt: new Date() };
    const result = await db.collection('posts').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedPost }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json({ ...updatedPost, id }); // Include ID in response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update post' });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const db = getDB();
  const { id } = req.params;
  // Check if the ID is a valid ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  try {
    const result = await db.collection('posts').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Unable to delete post' });
  }
};


module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
