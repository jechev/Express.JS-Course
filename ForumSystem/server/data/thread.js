const mongoose = require('mongoose')
const User = require('./user')
const Answer = require('./answer')

var threadSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  publishTime: {
    type: Date,
    default: Date.now
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
    default: []
  }]
})

var Thread = module.exports = mongoose.model('Thread', threadSchema)