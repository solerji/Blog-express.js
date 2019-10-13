const connection = require('../routes/db/mysqldb.js')

module.exports.getTagsByTitle = function(title, callback) {
  let sql =
    'SELECT tag_name, article_title FROM article_tag WHERE article_title = ?'
  connection.query(sql, [title], callback)
}

module.exports.removeTag = function(tag, callback) {
  let deleteTagSql =
    'DELETE FROM article_tag WHERE article_title = ? AND tag_name = ?'
  tag.forEach(item => {
    let params = [item.article_title, item.tag_name]
    console.log(1212, params)
    connection.query(deleteTagSql, params, callback)
  })
}

module.exports.addTag = function(tags, callback) {
  let addTagSql =
    'INSERT INTO article_tag(tag_name, article_title) VALUES (?,?)'
  tags.tagName.forEach(item => {
    let params = [item.tag_name, item.article_title]
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
