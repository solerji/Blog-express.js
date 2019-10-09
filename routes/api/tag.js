const express = require('express')
const router = express.Router()
const connection = require('../db/mysqldb.js')

// 获取标签及时间轴
let searchTagsAndTime =
  'SELECT tag_name, article_title, update_time FROM article_tag WHERE tag_name = ?'
router.post('/api/tagsAndTime', (req, res) => {
  let tagName = req.body.tagName
  connection.query(searchTagsAndTime, tagName, function(err, tags) {
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
let searchTags = 'SELECT DISTINCT tag_name FROM article_tag'
router.get('/api/tags', (req, res) => {
  connection.query(searchTags, function(err, tags) {
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
