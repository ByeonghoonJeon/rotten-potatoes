// imports `mongoose`. We need `mongoose` here to create the new model.
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = mongoose.model('Comment', new mongoose.Schema({
  title: String,
  content: String,
  reviewId: { type: Schema.Types.ObjectId, ref: 'Review' }
    },{
    timestamps: true
  }));

module.exports = Comment