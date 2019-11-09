const connection = require('../routes/db/mysqldb.js')

module.exports.getTimelineById = function(aid) {
  let sql =
    'SELECT aid, update_time, title FROM article ORDER BY update_time DESC'
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
