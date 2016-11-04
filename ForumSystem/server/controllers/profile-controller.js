const User = require('../data/user')

module.exports = {
  profile: (req, res) => {
    var username = req.params.username
    User.findOne({'username': username})
    .populate({path: 'answers', options: {sort: { 'publishTime': 'desc' }}})
    .populate({path: 'threads', options: {sort: { 'publishTime': 'desc' }}})
    .then(user => {
      console.log(user)
    })
  }
}
