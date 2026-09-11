// ===============================================================
//  Link
//  Mongoose model defining the schema for the personal link tree.
//  Handles the display name, the actual URL, and tracks the 
//  number of times each link is clicked by users.
// ===============================================================

const mongoose = require('mongoose');

// ==============================================================
// SCHEMA DEFINITION
// ==============================================================

const linkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Link title is required'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'The actual URL is required'],
      trim: true,
    },
    clicks: {
      type: Number,
      default: 0, // Every new link starts with zero clicks
      min: [0, 'Clicks cannot be negative'],
    },
    isActive: {
      type: Boolean,
      default: true, 
      // Soft delete mechanism: set to false to hide the link on the frontend without deleting data
    },
  },
  // ============================================================
  // SCHEMA OPTIONS
  // ============================================================
  { 
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  }
);

// ============================================================
// MODEL COMPILATION & EXPORT
// Compiles the schema into a usable model and exports it
// ============================================================

const Link = mongoose.model('Link', linkSchema); 

module.exports = Link;
