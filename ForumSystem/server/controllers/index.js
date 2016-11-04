const homeController = require('./home-controller')
const userController = require('./user-controller')
const threadController = require('./thread-controller')
const answerController = require('./answer-controller')
const profileController = require('./profile-controller')

module.exports = {
  home: homeController,
  user: userController,
  thread: threadController,
  answer: answerController,
  profile: profileController
}
