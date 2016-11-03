const mongoose = require('mongoose')
const User = require('./user')
const Thread = require('./thread')

var answerSchema = mongoose.Schema({
  text: {
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
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread'
  }
})

var Answer = module.exports = mongoose.model('Answer', answerSchema)
