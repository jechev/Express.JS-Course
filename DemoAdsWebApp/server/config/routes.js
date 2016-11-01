var controllers = require('../controllers')
var auth = require('../config/auth')
var passport = require('passport')
module.exports = (app) => {
  app.get('/', controllers.home.index)

  app.get('/users/register', controllers.users.register)
  app.post('/users/register', controllers.users.create)
  app.get('/users/login', controllers.users.login)
  app.post('/users/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }), controllers.users.authenticate)
  app.post('/users/logout', controllers.users.logout)
  app.get('/article/add',auth.isAuthenticated, controllers.articles.add)
  app.post('/article/add',auth.isAuthenticated, controllers.articles.create)
  // app.get('/articles/create', auth.isInRole('Admin'), controllers.articles.create)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('Not Found')
    res.end()
  })
}