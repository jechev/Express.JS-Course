const Tweet = require('../data/tweet')
const auth = require('../config/auth')
module.exports = {
  index: (req, res) => {
    var admin = auth.isInRole('Admin')
    
    Tweet.find({})
    .populate({path: 'author'})
    .sort({createdDate: 'desc'})
    .limit(100)
    .exec()
    .then(tweets => {
      res.render('home/index', {tweets: tweets, admin: admin})
    })
  }
}
