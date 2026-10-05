// ===============================================================
//  server
//  Main entry point for the Express server.
//  Handles database connection, middleware setup, and routing.
// ===============================================================

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Loads our secret variables from the .env file

// Import our database blueprint
const Link = require('./models/Link');

// ==============================================================
// INITIALIZATION
// ==============================================================
const app = express();
const PORT = process.env.PORT || 5000;

// ==============================================================
// MIDDLEWARE
// ==============================================================
// Tells Express how to read JSON data sent in requests
app.use(express.json());

// Tells Express to serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(require('path').join(__dirname, '../../Frontend/legacy/public')));

// ==============================================================
// DATABASE CONNECTION
// ==============================================================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to Local MongoDB successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ==============================================================
// ROUTES (We will add more later)
// ==============================================================

// Health Check Route - just to make sure the server is awake
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is up and running!' });
});

// ==============================================================
// ROUTES (API Endpoints)
// ==============================================================

// GET ALL LINKS: Sends all active links to the frontend
app.get('/api/links', async (req, res) => {
  try {
    // Find all links where isActive is true
    const links = await Link.find({ isActive: true });
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching links', error });
  }
});

// CREATE A NEW LINK: Receives data and saves it to the database
app.post('/api/links', async (req, res) => {
  try {
    const { title, url } = req.body;
    
    // Create a new link using our Mongoose blueprint
    const newLink = await Link.create({ title, url });
    
    // Send the newly created link back as a success response
    res.status(201).json(newLink);
  } catch (error) {
    res.status(400).json({ message: 'Error creating link', error });
  }
});

// TRACK A CLICK: Increases the click count when someone clicks a link
app.put('/api/links/:id/click', async (req, res) => {
  try {
    const linkId = req.params.id; // Get the ID from the URL
    
    // Find the link by ID and increase the 'clicks' number by 1
    const updatedLink = await Link.findByIdAndUpdate(
      linkId, 
      { $inc: { clicks: 1 } }, 
      { new: true } // Returns the updated document
    );

    res.status(200).json(updatedLink);
  } catch (error) {
    res.status(400).json({ message: 'Error updating clicks', error });
  }
});

// ==============================================================
// START SERVER
// ==============================================================
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
