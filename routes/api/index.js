const article = require('./article.js')
const tag = require('./tag.js')
const login = require('./login.js')
// const visitor = require('./visitor')
const timeline = require('./timeline')

module.exports = app => {
  app.use(article)
  app.use(tag)
  app.use(login)
  // app.use(visitor)
  app.use(timeline)
}
