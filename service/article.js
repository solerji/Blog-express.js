const connection = require('../routes/db/mysqldb.js')

module.exports.getArticleById = function(aid, callback) {
  let sql =
    'SELECT aid, title, author, update_time, content FROM article WHERE aid = ?'
  connection.query(sql, aid, callback)
}

module.exports.updateArticleById = function(article, callback) {
  let sql =
    'UPDATE article SET title = ?, author = ?, content = ? WHERE aid = ?'
  let params = [article.title, article.author, article.content, article.aid]
  connection.query(sql, params, callback)
}

module.exports.addArticle = function(article, callback) {
  let addSql = 'INSERT INTO article(title, author, content) VALUES (?,?,?)'
  let params = [article.title, article.author, article.content]
  connection.query(addSql, params, callback)
}
