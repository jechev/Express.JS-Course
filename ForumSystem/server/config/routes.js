const controllers = require('../controllers')
const auth = require('../config/auth')
const passport = require('passport')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  // User Routes
  app.get('/user/register', controllers.user.register)
  app.post('/user/register', controllers.user.create)
  app.get('/user/login', controllers.user.login)
  app.post('/user/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/user/login', failureFlash: true }), controllers.user.authenticate)
  app.post('/user/logout', controllers.user.logout)

  // Thread Routes
  app.get('/add', auth.isAuthenticated, controllers.thread.add)
  app.post('/add', auth.isAuthenticated, controllers.thread.create)
  app.get('/list', controllers.thread.listAll)
  app.get('/post/:id/:title', controllers.thread.details)
  // Answer Routes
  app.post('/post/:id/:title/answer', auth.isAuthenticated, controllers.answer.create)
  // Profile Routes
  app.get('/profile/:username', auth.isAuthenticated, controllers.profile.profile)
  // app.get('/articles/create', auth.isInRole('Admin'), controllers.articles.create)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('Not Found')
    res.end()
  })
}


