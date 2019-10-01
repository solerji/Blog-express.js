const express = require('express')
const router = express.Router()
const connection = require('../db/mysqldb.js')

// 获取时间轴时间和标题
router.get('/api/timeline', (req, res) => {
  connection.query(
    'SELECT aid, createTime, updateTime, title FROM article ORDER BY updateTime DESC',
    function(err, timeline) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
        return
      } else if (timeline) {
        timeline.forEach(item => {
          var showTime = item.updateTime
          if (!item.updateTime) {
            showTime = item.createTime
          }
          item.showTime = showTime
        })
        res.status(200).send({
          list: timeline
        })
      } else {
        res.status(404).send('no data!')
      }
    }
  )
})

// 根据标签获取时间轴

module.exports = router
