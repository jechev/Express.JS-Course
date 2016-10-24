var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var pug = require('pug')
var expressValidator = require('express-validator')
var flash = require('connect-flash')
var session = require('express-session')
var passport =require('passport')
var localStrategy = require('passport-local').Strategy
var mongo = require('mongodb')
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var connection = 'mongodb://localhost:27017/fistWebApp'
mongoose.connect(connection).then(() => {
    console.log('Mongo is up')
})

//routes
var routes = require('./routes/index')
var users = require('./routes/users')

var db = mongoose.connection
// Init App
var app = express()
// View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}))
app.use(cookieParser())
//Set Static Folder
app.use(express.static(__dirname + '/public'))
//Express session Middleware
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}))
//Passport init Middleware
app.use(passport.initialize())
app.use(passport.session())

//Express validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
        root = namespace.shift()
        formParam = root
        
        while(namespace.length){
            formParam+= '[' + namespace.shift() + ']'
        }
        return {
            params:formParam,
            msg:msg,
            value:value
        }
    }
}))
//Conect flash Middleware
app.use(flash());

//Global Vars
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})
app.locals.moment = require('moment');

app.use('/', routes)
app.use('/users',users)

const port=1377
app.listen(port, () => {
    console.log('Server started on port '+ port )
})