var express = require('express')
var router = express.Router()
var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })
var passport =require('passport')
var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

router.get('/register', function(req, res){
    res.render('register')
})

router.post('/register',upload.single('avatar'), function(req, res){
    var name = req.body.name
    var username = req.body.username
    var password = req.body.password
    var password2 = req.body.password2
    var avatar = req.file
    //Validation 
    req.checkBody('name', 'Name is required').notEmpty()
    req.checkBody('username', 'Username is required').notEmpty()
    req.checkBody('password', 'Password is required').notEmpty()
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password)
    var errors = req.validationErrors()

    if(errors){
        res.render('register',{
            errors:errors
        })
    } else {
        var newUser = new User({
            name: name,
            username: username,
            password: password,
            avatar: avatar
        })
        User.createUser(newUser, function(err,user){
            if(err) throw err
        })
        req.flash('success_msg', 'You are registered and can now login')

        res.redirect('/users/login')
    }

})

router.get('/login', function(req, res){
    res.render('login')
})

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username,function(err,user){
        if(err) throw err
        if(!user){
            return done(null, false,{message:'Unknown user'})
        }
        User.comparePassword(password,user.password,function(err, isMatch){
           if(err) throw err
           if(isMatch){
               return done(null,user)
           } else{
               return done(null, false,{message:'Invalid Password'})
           }
        })     
    })
}))

passport.serializeUser(function(user, done) {
  done(null, user.id)
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user)
  });
});

router.post('/login',
  passport.authenticate('local',{successRedirect:'/',failureRedirect:'/users/login',failureFlash:true}),
  function(req, res) {
    res.redirect('/')
  });
  router.get('/logout',function(req, res){
      req.logout()
      req.flash('success_msg','You are logged out')
      res.redirect('/users/login')
  })

module.exports = router