const homeController = require('./home-controller')
const userController = require('./user-controller')
const tweetController = require('./tweet-controller')
const profileController = require('./profile-controller')
const adminController = require('./admin-controller')

module.exports = {
  home: homeController,
  user: userController,
  tweet: tweetController,
  profile: profileController,
  admin: adminController
}
