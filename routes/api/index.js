const article = require('./article.js')
const tag = require('./tag.js')
const login = require('./login.js')
const user = require('./user.js')
// const visitor = require('./visitor')
const timeline = require('./timeline')
// var logger = require('../../log/logger.js').logger('./index', warn)

module.exports = app => {
  app.use(article)
  app.use(tag)
  app.use(login)
  app.use(user)
  // app.use(visitor)
  app.use(timeline)
}
