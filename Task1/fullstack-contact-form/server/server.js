const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/contactform', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB', error);
});

// Define a schema for the contact messages
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

// Create a model based on the schema
const ContactMessage = mongoose.model('ContactMessage', contactSchema);

// API endpoint to handle form submissions
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const newMessage = new ContactMessage({ name, email, message });
        await newMessage.save();  // Save the message to MongoDB
        res.status(200).json({ message: 'Message saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving message' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
