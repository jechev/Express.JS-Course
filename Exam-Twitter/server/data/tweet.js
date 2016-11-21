const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const User = require('./user')

var textValidate = validate({
  validator: 'isLength',
  arguments: [3, 140],
  message: 'Text should be between {ARGS[0]} and {ARGS[1]} characters'
})

var tweetSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    validate: textValidate
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [String],
  handlesUsers: [String]
})

var Tweet = module.exports = mongoose.model('Tweet', tweetSchema)
