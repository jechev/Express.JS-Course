var express = require('express')
var router = express.Router()

router.get('/',ensureAuthenticated,function(req, res){
    var user = res.locals.user
    console.log(user)
    // res.setHeader('Content-Type',user.avatar.mimetype)
    res.render('index',{user:user})
})

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect('users/login')
    }
}
module.exports = router