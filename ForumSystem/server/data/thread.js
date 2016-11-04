const mongoose = require('mongoose')
const User = require('./user')
const Answer = require('./answer')
const deepPopulate = require('mongoose-deep-populate')(mongoose)
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
  lastAnswerDate: {
    type: Date
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
    default: []
  }]
})
threadSchema.plugin(deepPopulate)
var Thread = module.exports = mongoose.model('Thread', threadSchema)

