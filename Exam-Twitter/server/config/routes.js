const controllers = require('../controllers')
const auth = require('./auth')
const passport = require('passport')

module.exports = (app) => {
  app.get('/', controllers.home.index)

  app.get('/user/register', controllers.user.register)
  app.post('/user/register', controllers.user.create)
  app.get('/user/login', controllers.user.login)
  app.post('/user/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/user/login', failureFlash: true }), controllers.user.authenticate)
  app.post('/user/logout', controllers.user.logout)

  app.get('/tweet', auth.isAuthenticated, controllers.tweet.add)
  app.post('/tweet', auth.isAuthenticated, controllers.tweet.create)
  app.get('/tag/:tagName', controllers.tweet.listByTag)

  app.get('/profile/:username', auth.isAuthenticated, controllers.profile.profile)

  app.post('/tweet/delete/:id', auth.isInRole('Admin'), controllers.tweet.deleteById)
  app.get('/tweet/update/:id', auth.isInRole('Admin'), controllers.tweet.detailsForUpdate)
  app.post('/tweet/update/:id', auth.isInRole('Admin'), controllers.tweet.update)

  app.get('/admins/all', auth.isInRole('Admin'), controllers.admin.all)
  app.post('/admins/add/:id', auth.isInRole('Admin'), controllers.admin.addAdmin)


  app.all('*', (req, res) => {
    res.status(404)
    res.send('Not Found')
    res.end()
  })
}
