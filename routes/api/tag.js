const tagService = require('../../service/tag.js')

const express = require('express')
const router = express.Router()

// 获取标签及时间轴
router.post('/api/tagsAndTime', async (req, res) => {
  let tagAndTime = await tagService.getTagTimeLine(req.body.tagName)
  if (tagAndTime) {
    console.log('[获取标签及时间轴成功！]')
    res.status(200).send({
      list: tagAndTime
    })
  } else {
    res.status(500).send('服务器端错误!', err.message)
  }
})

// 获取标签列表
router.get('/api/tags', async (req, res) => {
  let tagList = await tagService.getTagList(req)
  if (tagList) {
    console.log('[获取标签及列表成功！]')
    res.status(200).send({
      list: tagList
    })
  } else {
    res.status(500).send('服务器端错误!', err.message)
  }
})

module.exports = router
