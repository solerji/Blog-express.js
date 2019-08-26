var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'solerji',
  port: '3306',
  database: 'my-blog'
})

connection.connect(function(err) {
  if (err) {
    console.log('与mysql数据库建立连接失败')
  } else {
    console.log('与mysql数据库建立连接成功')
  }
})

module.exports = connection
