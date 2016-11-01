var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../data/user')

module.exports = () => {
  passport.use(new LocalStrategy(
    function (username, password, done) {
      User.getUserByUsername(username, function (err, user) {
        if (err) throw err
        if (!user) {
          return done(null, false, { message: 'Unknown user or Invalid Password' })
        }
        User.comparePassword(password, user.password, function (err, isMatch) {
          if (err) throw err
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false, { message: 'Unknown user or Invalid Password' })
          }
        })
      })
    }))
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  });

  passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
      done(err, user)
    });
  });
}