const connection = require('../routes/db/mysqldb.js')

module.exports.getArticleById = function(aid) {
  let sql =
    'SELECT aid, title, author, update_time, content, show_content FROM article WHERE aid = ?'
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

module.exports.getArticleList = function() {
  let sql = 'SELECT aid, title, show_content FROM article'
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

module.exports.updateArticleById = function(article) {
  let sql =
    'UPDATE article SET title = ?, author = ?, content = ? , show_content= ? WHERE aid = ?'
  let params = [
    article.title,
    article.author,
    article.content,
    article.showContent,
    article.aid
  ]
  // connection.query(sql, params, callback)
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

module.exports.addArticle = function(article) {
  let addSql =
    'INSERT INTO article(title, author, content, show_content) VALUES (?,?,?,?)'
  let params = [
    article.title,
    article.author,
    article.content,
    article.showContent
  ]
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

module.exports.delArticleById = function(aid) {
  let delSql = 'DELETE FROM article where aid = ?'
  return new Promise((resolve, reject) => {
    connection.query(delSql, aid, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

module.exports.searchArticleByTitle = function(title) {
  let sql = 'SELECT * FROM article WHERE title LIKE ? '
  let newTitle = '%' + title + '%'
  return new Promise((resolve, reject) => {
    connection.query(sql, newTitle, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

module.exports.getArticlePage = function(page) {
  console.log(111, page.currentPage)
  let sql = 'SELECT aid, title, show_content FROM article LIMIT ? , ? '
  // let countSql = 'SELECT count(aid) FROM article'
  let show = [(page.currentPage - 1) * page.pageIndex, page.pageIndex]
  return new Promise((resolve, reject) => {
    connection.query(sql, show, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}
