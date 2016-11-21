const User = require('../data/user')
const Tweet = require('../data/tweet')
const ObjectId = require('mongoose').Types.ObjectId
module.exports = {
  profile: (req, res) => {
    var username = req.params.username
    User.findOne({ 'username': username }).then(user => {
      if (user) {
        Tweet.find({})
          .or([{ author: user._id }, { handlesUsers: username }])
          .populate('author')
          .sort({ createdDate: 'desc' })
          .limit(100)
          .exec()
          .then(tweets => {
            res.render('profile/profile', {tweets: tweets, username: username})
          })
      } else {
        Tweet.find({ handlesUsers: username })
          .populate('author')
          .sort({ createdDate: 'desc' })
          .limit(100)
          .exec()
          .then(tweets => {
            res.render('profile/profile', {tweets: tweets, username: username})
          })
      }
    })
  }
}
