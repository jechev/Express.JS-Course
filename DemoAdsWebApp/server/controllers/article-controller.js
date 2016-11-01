var Article = require('../data/article')

module.exports = {
  add: (req, res) => {
    res.render('articles/add')
  },
  create: (req, res) => {
    var title = req.body.title
    var description = req.body.description

    req.checkBody('title', 'Title is required').notEmpty()
    req.checkBody('description', 'Description is required').notEmpty()
    var errors = req.validationErrors()
    var currentUser = req.user._doc._id;
    if (errors) {
      res.render('articles/add', {
        errors: errors
      })
    } else {
      var newArticle = new Article({
        title: title,
        description: description,
        user:currentUser
      })
      Article.create(newArticle)
      req.flash('success_msg', 'You added article')
      res.redirect('/')
    }
  }
}