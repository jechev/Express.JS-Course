const User = require('../data/user')
const Tweet = require('../data/tweet')

module.exports = {
  add: (req, res) => {
    res.render('tweet/add')
  },
  create: (req, res) => {
    var tagPattern = /(#\w+)/g
    var handlePattern = /(@\w+)/g
    var text = req.body.text
    var tags = text.match(tagPattern)
    var handleUsers = text.match(handlePattern)
    var userId = req.user._doc._id
    req.checkBody('text', 'Tweet must have text').notEmpty()
    var errors = req.validationErrors()
    if (errors) {
      res.render('tweet/add', {
        errors: errors
      })
    } else {
      var newTweet = new Tweet({
        text: text,
        author: userId
      })
      for (var i in tags) {
        var newTag = tags[i].replace('#', '').toLowerCase()
        if (newTweet.tags.indexOf(newTag) === -1) {
          newTweet.tags.push(newTag)
        }
      }
      for (var v in handleUsers) {
        var newHandleUser = handleUsers[v].replace('@', '')
        if (newTweet.handlesUsers.indexOf(newHandleUser) === -1) {
          newTweet.handlesUsers.push(newHandleUser)
        }
      }
      Tweet.create(newTweet).then(tweet => {
        var tweetId = tweet._id
        User.findByIdAndUpdate(
          userId,
          { $push: { 'tweets': tweetId } },
          { safe: true, upsert: true, new: true },
          function (err, model) {
            if (err) throw err
          })
      })
      req.flash('success_msg', 'You added new tweet')
      res.redirect('/')
    }
  },
  listByTag: (req, res) => {
    var tag = req.params.tagName
    Tweet.find(
      {
        tags: tag
      }
    )
      .populate({ path: 'author' })
      .sort({ createdDate: 'desc' })
      .limit(100)
      .exec()
      .then(tweets => {
        res.render('tweet/listByTag', { tweets: tweets, tag: tag })
      })
  },
  deleteById: (req, res) => {
    var id = req.params.id
    Tweet.findByIdAndRemove(id).then(() => {
      req.flash('success_msg', 'You delete tweet with id ' + id)
      res.redirect('/')
    })
  },
  detailsForUpdate: (req, res) => {
    var id = req.params.id
    Tweet.findById(id).then((tweet) => {
      res.render('tweet/update', { tweet })
    })
  },
  update: (req, res) => {
    var id = req.params.id
    var tagPattern = /(#\w+)/g
    var handlePattern = /(@\w+)/g
    var tagArray = []
    var handlesUsersArray = []
    var text = req.body.text
    var tags = text.match(tagPattern)
    var handleUsers = text.match(handlePattern)
    for (var i in tags) {
      var newTag = tags[i].replace('#', '').toLowerCase()
      if (tagArray.indexOf(newTag) === -1) {
        tagArray.push(newTag)
      }
    }
    for (var v in handleUsers) {
      var newHandleUser = handleUsers[v].replace('@', '')
      if (handlesUsersArray.indexOf(newHandleUser) === -1) {
        handlesUsersArray.push(newHandleUser)
      }
    }
    req.checkBody('text', 'Tweet must have text').notEmpty()
    var errors = req.validationErrors()
    if (errors) {
      res.render('tweet/update', {
        errors: errors
      })
    } else {
      Tweet.findByIdAndUpdate(id,
        { $set: { text: text, tags: tagArray, handlesUsers: handlesUsersArray } },
        { safe: true, upsert: true, new: true },
        function (err, model) {
          if (err) throw err
          console.log(model)
        }
      )
      req.flash('success_msg', 'Successfuly update tweet')
      res.redirect('/')
    }
  }
}
