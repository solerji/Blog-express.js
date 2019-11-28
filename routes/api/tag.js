const tagService = require('../../service/tag.js')

const express = require('express')
const router = express.Router()

// 获取标签及时间轴
router.post('/api/tagsAndTime', async (req, res) => {
  try {
    let tagAndTime = await tagService.getTagTimeLine(req.body.tagName)
    // console.log('[获取标签及时间轴成功！]')
    res.status(200).send({
      list: tagAndTime
    })
  } catch (err) {
    res.status(500).send('服务器端错误!', err.message)
  }
})

// 获取标签列表
router.get('/api/tags', async (req, res) => {
  try {
    let tagList = await tagService.getTagList(req)
    // console.log('[获取标签及列表成功！]')
    res.status(200).send({
      list: tagList
    })
  } catch (err) {
    res.status(500).send('服务器端错误!', err.message)
  }
})

// 获取时间轴列表
router.post('/api/getTimeLine', async (req, res) => {
  try {
    let result = await tagService.getTimeLineList(req.body)
    try {
      let count = await tagService.getTagCount(req.body)
      res.status(200).send({
        code: 0,
        list: result,
        count: count
      })
    } catch (err) {
      res.status(500).send('服务器端错误!', err.message)
    }
  } catch (err) {
    res.status(500).send('服务器端错误!', err.message)
  }
})
module.exports = router
