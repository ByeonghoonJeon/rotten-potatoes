// models/review.js
const mongoose = require('mongoose');
const Comment = require('../models/comment')

const Review = mongoose.model('Review', new mongoose.Schema({
  title: String,
  description: String,
  movieTitle: String,
  rating: String},{
  timestamps: true
}));

module.exports = Review;