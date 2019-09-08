const express = require('express')
const router = express.Router()
const connection = require('../db/mysqldb.js')

// 获取标签
router.get('/api/tags', (req, res) => {
  connection.query('SELECT aid, tags FROM article', function(err, tags) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message)
      return
    } else if (tags) {
      console.log(tags)
      res.status(200).send({
        list: tags
      })
    } else {
      res.status(404).send('no data!')
      // res.send(err.message)
    }
  })
})

module.exports = router
