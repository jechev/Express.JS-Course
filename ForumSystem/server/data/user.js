const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Thread = require('./thread')
const Answer = require('./answer')

var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  roles: [String],
  threads: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread'
  }],
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  }]
})

var User = module.exports = mongoose.model('User', userSchema)

module.exports.createUser = function (newUser, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) throw err
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      if (err) throw err
      newUser.password = hash
      newUser.save(callback)
    })
  })
}

module.exports.getUserByUsername = function (username, callback) {
  var query = { username: username }
  User.findOne(query, callback)
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
    if (err) throw err
    callback(null, isMatch)
  })
}
module.exports.getUserById = function (id, callback) {
  User.findById(id, callback)
}

module.exports.seedAdminUser = function () {
  User.find({}).then(users => {
    if (users.length === 0) {
      var newUser = {
        username: 'Admin',
        password: 'Admin123',
        name: 'Admin Adminov',
        roles: ['Admin']
      }
      bcrypt.genSalt(10, function (err, salt) {
        if (err) throw err
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          if (err) throw err
          newUser.password = hash
          User.create(newUser)
        })
      })

      console.log('Admin is seed')
    }
  })
}
