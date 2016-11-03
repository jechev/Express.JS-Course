const homeController = require('./home-controller')
const userController = require('./user-controller')
const threadController = require('./thread-controller')
module.exports = {
  home: homeController,
  user: userController,
  thread: threadController
}
