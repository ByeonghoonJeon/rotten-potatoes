// models/review.js

const mongoose = require('mongoose');

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  rating: String
  
});

module.exports = Review;