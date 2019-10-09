const connection = require('../routes/db/mysqldb.js')

module.exports.getTagsByTitle = function(title, callback) {
  let sql =
    'SELECT tag_name, article_title FROM article_tag WHERE article_title = ?'
  // console.log(title)
  connection.query(sql, [title], callback)
}

module.exports.removeTag = function(title, tagName, callback) {
  let deleteTagSql =
    'DELETE article_tag WHERE article_title = ? AND tag_name = ?'
  connection.query(deleteTagSql, [title, tagName], callback)
}

module.exports.addTag = function(tags, callback) {
  let addTagSql =
    'INSERT INTO article_tag(tag_name, article_title) VALUES (?,?)'
  tags.tagName.forEach(item => {
    let params = [item.tag_name, item.article_title]
    connection.query(addTagSql, params, callback)
  })
}
