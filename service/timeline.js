const connection = require('../routes/db/mysqldb.js')

module.exports.getTimelineById = function(aid, callback) {
  let sql =
    'SELECT aid, update_time, title FROM article ORDER BY update_time DESC'
  connection.query(sql, aid, callback)
}
