const express = require('express')

var app = express()

var env = process.env.NODE_ENV || 'development'
var config = require('./server/config/config')[env]

require('./server/config/database')(config)
require('./server/config/express')(config, app)
require('./server/config/routes')(app)
require('./server/config/passport')()

app.listen(config.port)
console.log('Express listen on port ' + config.port)
