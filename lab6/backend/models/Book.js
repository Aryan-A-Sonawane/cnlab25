const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 'Biography', 'Mystery', 'Romance', 'Fantasy', 'Self-Help']
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  publisher: {
    type: String,
    required: true
  },
  publishedYear: {
    type: Number,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  language: {
    type: String,
    default: 'English'
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/200x300?text=Book+Cover'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', bookSchema);
