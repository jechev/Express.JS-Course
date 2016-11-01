var mongoose = require('mongoose')
var User = require('./user')

var articleSchema = mongoose.Schema({
  title:{
    type:String,
    unique:true
  },
  description:{
    type:String
  },
  user:{type:mongoose.Schema.Types.ObjectId, ref: 'User'}
})
var Article = module.exports = mongoose.model('Article', articleSchema)