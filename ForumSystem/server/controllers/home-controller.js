const Thread = require('../data/thread')

module.exports = {
  index: (req, res) => {
    Thread.find({})
    .populate({path: 'author'})
    .sort({lastAnswerDate: 'desc'})
    .limit(20)
    .exec()
    .then(threads => {
      res.render('home/index', {threads})
    })
  }
}

