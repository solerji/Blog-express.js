const connection = require('../routes/db/mysqldb.js')

module.exports.getArticleById = function(aid) {
  let sql =
    'SELECT aid, title, author, update_time, content FROM article WHERE aid = ?'
  return new Promise((resolve, reject) => {
    connection.query(sql, aid, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

module.exports.getArticleList = function(req, callback) {
  let sql = 'SELECT aid, title, content FROM article'
  connection.query(sql, callback)
}

module.exports.updateArticleById = function(article, callback) {
  let sql =
    'UPDATE article SET title = ?, author = ?, content = ? WHERE aid = ?'
  let params = [article.title, article.author, article.content, article.aid]
  connection.query(sql, params, callback)
}

module.exports.addArticle = function(article) {
  let addSql = 'INSERT INTO article(title, author, content) VALUES (?,?,?)'
  let params = [article.title, article.author, article.content]
  return new Promise((resolve, reject) => {
    connection.query(addSql, params, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

module.exports.delArticleById = function(aid, callback) {
  let delSql = 'DELETE FROM article where aid = ?'
  connection.query(delSql, aid, callback)
}

module.exports.searchArticleByTitle = function(title, callback) {
  let sql = 'SELECT * FROM article WHERE title LIKE ? '
  let newTitle = '%' + title + '%'
  connection.query(sql, newTitle, callback)
}
