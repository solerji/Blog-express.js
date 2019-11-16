const connection = require('../routes/db/mysqldb.js')

module.exports.getTagsByTitle = function(title) {
  let sql =
    'SELECT tag_name, article_title FROM article_tag WHERE article_title = ?'
  return new Promise((resolve, reject) => {
    connection.query(sql, [title], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

module.exports.removeTag = function(tag) {
  let deleteTagSql = 'DELETE FROM article_tag WHERE article_title = ? '
  return new Promise((resolve, reject) => {
    connection.query(deleteTagSql, tag, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

module.exports.addTag = function(tags) {
  let addTagSql =
    'INSERT INTO article_tag(tag_name, article_title) VALUES (?,?)'
  return new Promise((resolve, reject) => {
    connection.query(addTagSql, tags, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

module.exports.getTagList = function() {
  let sql = 'SELECT DISTINCT tag_name FROM article_tag'
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

module.exports.getTagTimeLine = function(tag) {
  let sql =
    'SELECT tag_name, article_title, update_time FROM article_tag WHERE tag_name = ?'
  return new Promise((resolve, reject) => {
    connection.query(sql, tag, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

module.exports.getTimeLineList = function(page) {
  let sql =
    'SELECT tag_name, article_title, update_time FROM article_tag WHERE tag_name = ? LIMIT ? , ? '
  let show = [
    page.tagName,
    (page.currentPage - 1) * page.pageIndex,
    page.pageIndex
  ]
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

module.exports.getTagCount = function(name) {
  let tagName = name.tagName
  let countSql =
    'SELECT count(article_title) as count FROM article_tag WHERE tag_name = ?'
  return new Promise((resolve, reject) => {
    connection.query(countSql, tagName, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}
