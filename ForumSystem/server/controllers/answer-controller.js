const Answer = require('../data/answer')
const Thread = require('../data/thread')
const User = require('../data/user')
module.exports = {
  create: (req, res) => {
    if (req.user) {
      var threadId = req.params.id
      var threadTitle = req.params.title
      var textAnswer = req.body.text
      var userId = req.user._doc._id
      var newAnswer = new Answer({
        text: textAnswer,
        author: userId,
        thread: threadId
      })
      Answer.create(newAnswer).then(answer => {
        var answerId = answer._id
        Thread.findByIdAndUpdate(
        threadId,
        {$push: {'answers': answerId}, $set: {'lastAnswerDate': Date.now()}},
        {safe: true, upsert: true, new: true},
        function (err, model) {
          if (err) throw err
        })
        User.findByIdAndUpdate(
          userId,
          {$push: {'answers': answerId}},
          {safe: true, upsert: true, new: true},
          function (err, model) {
            if (err) throw err
          })
      })
      req.flash('success_msg', 'You added new answer')
      res.redirect('/post/' + threadId + '/' + threadTitle)
    }
  }
}
