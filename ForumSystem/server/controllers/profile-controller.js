const User = require('../data/user')

module.exports = {
  profile: (req, res) => {
    var username = req.params.username
    User.findOne({'username': username})
    .populate({path: 'answers', options: {sort: { 'publishTime': 'desc' }}})
    .populate({path: 'threads', options: {sort: { 'publishTime': 'desc' }}})
    .deepPopulate('answers.thread', function (err, _threads) {
      if (err) throw err
    })
    .then(user => {
      res.render('profile/profile', {user})
    })
  }
}
