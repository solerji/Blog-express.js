const express = require('express')
const router = express.Router()
const connection = require('../db/mysqldb.js')

// 获取时间轴时间和标题
router.get('/api/timeline', (req, res) => {
  connection.query(
    'SELECT aid, createTime, updateTime, title FROM article',
    function(err, timeline) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
        return
      } else if (timeline) {
        console.log(timeline)
        res.status(200).send({
          list: timeline
        })
      } else {
        res.status(404).send('no data!')
        // res.send(err.message)
      }
    }
  )
})

module.exports = router
