var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var Article = require('./article')

var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  name: {
    type: String
  },
  roles: [String],
  articles:[{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}]

})
var User = module.exports = mongoose.model('User', userSchema)

module.exports.createUser = function (newUser, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
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
  });
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
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          newUser.password = hash
          User.create(newUser)
        })
      })

      console.log('Admin is seed')
    }
  })
}