const express = require('express')
const router = express.Router()
const connection = require('../db/mysqldb.js')

// 获取标签
router.get('/api/tags', (req, res) => {
  db.Article.find({ isPublish: true }).distinct('tags', (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(doc)
    }
  })
})

module.exports = router
