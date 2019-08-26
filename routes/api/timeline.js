const express = require('express')
const router = express.Router()
const db = require('../db/db.js')

// 获取时间轴时间和标题
router.get('/api/timeline', (req, res) => {
    db.Article.find({isPublish: true}).distinct('updateTime','title', (err, doc) => {
        if (err) {
            console.log(err)
        } else if (doc) {
            res.send(doc)
        }
    })
})

module.exports = router