var homeController = require('./home-controller')
var userController = require('./user-controller')
var articleController = require('./article-controller')
module.exports = {
  home: homeController,
  users: userController,
  articles: articleController
}