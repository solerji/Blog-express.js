const tagService = require('../../service/tag.js')

const express = require('express')
const router = express.Router()

// 获取标签及时间轴
router.post('/api/tagsAndTime', (req, res) => {
  tagService.getTagTimeLine(req.body.tagName, function(err, tags) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message)
      return
    } else if (tags) {
      res.status(200).send({
        list: tags
      })
    } else {
      res.status(404).send('no data!', err.message)
    }
  })
})

// 获取标签列表
router.get('/api/tags', (req, res) => {
  tagService.getTagList(req, function(err, tags) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message)
      return
    } else if (tags) {
      res.status(200).send({
        list: tags
      })
    } else {
      res.status(404).send('no data!', err.message)
    }
  })
})

module.exports = router
