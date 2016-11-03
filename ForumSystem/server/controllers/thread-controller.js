const Thread = require('../data/thread')

module.exports = {
  add: (req, res) => {
    res.render('thread/add')
  },
  create: (req, res) => {
    if (req.user) {
      var title = req.body.title
      var description = req.body.description
      // Validation
      req.checkBody('title', 'Title is required').notEmpty()
      req.checkBody('description', 'Description is required').notEmpty()
      var errors = req.validationErrors()
      if (errors) {
        res.render('thread/add', {
          errors: errors
        })
      } else {
        var newThread = new Thread({
          title: title,
          description: description,
          author: req.user._doc._id
        })
        Thread.create(newThread)
        req.flash('success_msg', 'You added new thread')
        res.redirect('/list')
      }
    }
  },
  listAll: (req, res) => {
    Thread.find({})
    .populate({path: 'answers'})
    .populate
    .populate({path: 'author'})
    .then(threads => {
      res.render('thread/list', {threads})
    })
  },
  details: (req, res) => {
    var threadId = req.params.id
    Thread.findById(threadId)
    .populate({path: 'answers'})
    .populate({path: 'author'})
    .then(thread => {
      res.render('thread/details', {thread})
    })
  }
}
