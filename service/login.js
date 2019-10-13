const connection = require('../routes/db/mysqldb.js')

module.exports.login = function(req, callback) {
  let sql = 'SELECT name,password,id FROM user'
  connection.query(sql, callback)
}
