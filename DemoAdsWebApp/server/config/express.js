var express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var pug = require('pug')
var expressValidator = require('express-validator')
var flash = require('connect-flash')
var session = require('express-session')
var passport = require('passport')

module.exports = (config, app) => {
  // View Engine
  app.set('view engine', 'pug')
  app.set('views', config.rootPath + 'server/views')
  //Middleware
  app.use(cookieParser())
  // app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }))
  //Express session Middleware
  app.use(session({
    secret: 'secretniq-blog',
    saveUninitialized: true,
    resave: true
  }))
  //Passport init Middleware
  app.use(passport.initialize())
  app.use(passport.session())
  //Express validator Middleware
  app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split('.')
      root = namespace.shift()
      formParam = root

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']'
      }
      return {
        params: formParam,
        msg: msg,
        value: value
      }
    }
  }))
  //Conect flash Middleware
  app.use(flash());

  //Global Vars
  app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
  })

  app.locals.moment = require('moment');
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
    }

    next()
  })
  //Set Public Folder
  app.use(express.static(config.rootPath + 'public'))
}