const timelineService = require('../../service/timeline.js')
const express = require('express')
const router = express.Router()

// 获取时间轴时间和标题
router.get('/api/timeline', async (req, res) => {
  try {
    let timeline = await timelineService.getTimelineById(req.query.aid)
    // console.log('[查看时间轴成功！]')
    res.status(200).send({
      list: timeline
    })
  } catch (err) {
    res.status(500).send('服务器端错误!', err.message)
  }
})

module.exports = router
