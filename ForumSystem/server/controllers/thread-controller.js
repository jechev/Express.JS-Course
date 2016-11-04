const Thread = require('../data/thread')
const User = require('../data/user')

module.exports = {
  add: (req, res) => {
    res.render('thread/add')
  },
  create: (req, res) => {
    if (req.user) {
      var title = req.body.title
      var description = req.body.description
      var userId = req.user._doc._id
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
          author: userId
        })
        Thread.create(newThread).then(thread => {
          var threadId = thread._id
          User.findByIdAndUpdate(
          userId,
          {$push: {'threads': threadId}},
          {safe: true, upsert: true, new: true},
          function (err, model) {
            if (err) throw err
          })
        })
        req.flash('success_msg', 'You added new thread')
        res.redirect('/list')
      }
    }
  },
  listAll: (req, res) => {
    Thread.find({})
    .populate({path: 'answers'})
    .populate({path: 'author'})
    .sort({lastAnswerDate: 'desc'})
    .exec()
    .then(threads => {
      res.render('thread/list', {threads})
    })
  },
  details: (req, res) => {
    var threadId = req.params.id
    Thread.findById(threadId)
    .populate({path: 'answers', options: {sort: { 'publishTime': 'asc' }}})
    .deepPopulate('answers.author', function (err, _authors) {
      if (err) throw err
    })
    .populate({path: 'author'})
    .then(thread => {
      res.render('thread/details', {thread})
    })
  }
}
