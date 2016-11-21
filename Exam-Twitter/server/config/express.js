const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const pug = require('pug')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

module.exports = (config, app) => {
  // View Engine
  app.set('view engine', 'pug')
  app.set('views', config.rootPath + 'server/views')
  // Middleware
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  // Express session Middleware
  app.use(session({
    secret: 'secretniq-forum',
    saveUninitialized: true,
    resave: true
  }))
  // Passport init Middleware
  app.use(passport.initialize())
  app.use(passport.session())
  // Express validator Middleware
  app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split('.')
      var root = namespace.shift()
      var formParam = root

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']'
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      }
    }
  }))
  // Conect flash Middleware
  app.use(flash())

  // Global Vars
  app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.currentUser = req.user || null
    console.log()
    next()
  })

  app.locals.moment = require('moment')
  // Set Public Folder
  app.use(express.static(config.rootPath + 'public'))
}
