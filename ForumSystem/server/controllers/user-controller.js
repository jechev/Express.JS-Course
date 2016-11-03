const User = require('../data/user')

module.exports = {
  register: (req, res) => {
    res.render('user/register')
  },
  create: (req, res) => {
    var name = req.body.name
    var username = req.body.username
    var password = req.body.password
    // Validation
    req.checkBody('name', 'Name is required').notEmpty()
    req.checkBody('username', 'Username is required').notEmpty()
    req.checkBody('password', 'Password is required').notEmpty()
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password)
    var errors = req.validationErrors()

    if (errors) {
      res.render('user/register', {
        errors: errors
      })
    } else {
      var newUser = new User({
        name: name,
        username: username,
        password: password
      })
      User.createUser(newUser, function (err, user) {
        if (err) throw err
      })
      req.flash('success_msg', 'You are registered and can now login')

      res.redirect('/')
    }
  },

  login: (req, res) => {
    res.render('user/login')
  },
  authenticate: (req, res) => {
    res.redirect('/')
  },
  logout: (req, res) => {
    req.logout()
    req.flash('success_msg', 'You are logged out')
    res.redirect('/')
  }
}
