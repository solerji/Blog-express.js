const express = require('express')
const router = express.Router()
// const db = require('../db/db.js')
const connection = require('../db/mysqldb.js')

// 获取访客信息
router.get('/api/visitor', (req, res) => {
  db.Visitor.find({ isPublish: true }).distinct('updateTime', (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(doc)
    }
  })
})

module.exports = router
