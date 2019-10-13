const timelineService = require('../../service/timeline.js')
const express = require('express')
const router = express.Router()

// 获取时间轴时间和标题
router.get('/api/timeline', (req, res) => {
  timelineService.getTimelineById(req.query.aid, function(err, timeline) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message)
    } else if (timeline) {
      res.status(200).send({
        list: timeline
      })
    } else {
      res.status(404).send('no data!')
    }
  })
})

// 根据标签获取时间轴

module.exports = router
