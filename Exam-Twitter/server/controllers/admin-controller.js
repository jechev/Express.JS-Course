const User = require('../data/user')

module.exports = {
  all: (req, res) => {
    User.find({})
      .sort({ roles: 'desc' })
      .exec()
      .then((users) => {
        res.render('admin/all', { users })
      })
  },
  addAdmin: (req, res) => {
    var userId = req.params.id
    User.findByIdAndUpdate(
      userId,
      { $push: { 'roles': 'Admin' } },
      { safe: true, upsert: true, new: true },
      (err, user) => {
        if (err) throw err
        req.flash('success_msg', 'You made user ' + user.username + ' admin.')
        res.redirect('/admins/all')
      })
  }
}
