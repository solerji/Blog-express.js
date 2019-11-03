const connection = require('../routes/db/mysqldb.js')

module.exports.getTagsByTitle = function(title, callback) {
  let sql =
    'SELECT tag_name, article_title FROM article_tag WHERE article_title = ?'
  // connection.query(sql, [title], callback)
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

module.exports.removeTag = function(tag, callback) {
  let deleteTagSql = 'DELETE FROM article_tag WHERE article_title = ? '
  //  'DELETE FROM article_tag WHERE article_title = ? AND tag_name = ?'
  // if (tag.length > 0) {
  // tag.forEach(item => {
  // let params = [item.article_title, item.tag_name]
  connection.query(deleteTagSql, tag, callback)
  // })
  // }
}

module.exports.addTag = function(tags, callback) {
  let addTagSql =
    'INSERT INTO article_tag(tag_name, article_title) VALUES (?,?)'
  tags.tagName.forEach(item => {
    let params = [item, tags.title]
    connection.query(addTagSql, params, callback)
  })
}

module.exports.getTagList = function(req, callback) {
  let sql = 'SELECT DISTINCT tag_name FROM article_tag'
  connection.query(sql, callback)
}

module.exports.getTagTimeLine = function(tag, callback) {
  let sql =
    'SELECT tag_name, article_title, update_time FROM article_tag WHERE tag_name = ?'
  connection.query(sql, tag, callback)
}
