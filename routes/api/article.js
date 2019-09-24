const express = require('express')
const router = express.Router()
const connection = require('../db/mysqldb.js')

// 发布文章
let addSql =
  'INSERT INTO article(title, author, tags, createTime, content) VALUES (?,?,?,?,?)'
router.post('/api/addArticle', (req, res) => {
  let addSqlParams = [
    req.body.title,
    req.body.author,
    req.body.tags,
    req.body.createTime,
    req.body.content
  ]
  // console.log(3232, req.query)
  connection.query(addSql, addSqlParams, function(err, doc) {
    if (err) {
      console.log('[发布失败！] - ', err.message)
      return
    } else if (doc) {
      // console.log('发布成功 ID：', doc.aid)
      console.log('发布成功：', doc)
      res.status(200).send('发布成功')
    } else {
      res.status(404).send(err.message)
    }
  })
})

// 获取文章列表
router.get('/api/articles', (req, res) => {
  connection.query('SELECT aid, title, content FROM article', function(
    err,
    article
  ) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message)
      return
    } else if (article) {
      // if (aid) {
      // const token = creatToken(doc._id, doc.name)
      console.log(article)
      res.status(200).send({
        list: article
      })
      // } else {
      //   res.send('no data!')
      // }
    } else {
      res.status(404).send('no data!')
      // res.send(err.message)
    }
  })
})

// 获取某篇文章
router.get('/api/article', (req, res) => {
  connection.query(
    'SELECT aid, title, author, tags, createTime, updateTime, content FROM article',
    function(err, doc) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
        return
      } else if (doc) {
        for (var i = 0; i <= doc.length; i++) {
          if (doc[i].aid == req.query.aid) {
            res.status(200).send(doc[i])
            break
          }
        }
      } else {
        res.status(404).send(err.message)
      }
    }
  )
})

// 删除文章
router.delete('/api/delArticle', (req, res, next) => {
  console.log(req)
  var aid = req.body.aid
  connection.query('DELETE FROM article where aid = ?', aid, function(
    err,
    doc
  ) {
    if (err) {
      console.log('[删除失败！] - ', err.message)
      return
    } else if (doc) {
      console.log(doc.affectedRows)
      res.status(200).send('删除成功')
    } else {
      res.status(404).send(err.message)
    }
  })
})

let updateSql =
  'UPDATE article SET title = ?, author = ?, tags = ?, updateTime = ?, content = ?'
let checkSql = 'SELECT ? FROM article'
// 更新文章
router.post('/api/updateArticle', (req, res) => {
  let updateSqlParams = [
    req.body.title,
    req.body.author,
    req.body.tags,
    req.body.updateTime,
    req.body.content
  ]
  let aid = req.body.aid
  connection.query(checkSql, aid, function(err, doc) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message)
      return
    } else if (doc) {
      console.log(212, doc)
      connection.query(updateSql, updateSqlParams, function(err, doc) {
        if (err) {
          console.log('[更新失败！] - ', err.message)
          return
        } else if (doc) {
          console.log('更新成功：', doc)
          res.status(200).send('更新成功')
          // console.log('更新成功 ID：', doc.aid)
        } else {
          res.status(404).send(err.message)
        }
      })
    } else {
      res.status(404).send(err.message)
    }
  })
})

// 搜索一些文章
// router.get('/api/someArticles', (req, res) => {
//   const key = req.query.payload.key
//   const value = req.query.payload.value
//   const page = req.query.payload.page || 1
//   const skip = 4 * (page - 1)
//   const re = new RegExp(value, 'i')
//   if (key === 'tags') {
//     // 根据标签来搜索文章
//     const arr = value.split(' ')
//     db.Article.find({ tags: { $all: arr } })
//       .sort({ date: -1 })
//       .limit(4)
//       .skip(skip)
//       .exec()
//       .then(articles => {
//         res.send(articles)
//       })
//   } else if (key === 'title') {
//     // 根据标题的部分内容来搜索文章
//     db.Article.find({ title: re, isPublish: true })
//       .sort({ date: -1 })
//       .limit(4)
//       .skip(skip)
//       .exec()
//       .then(articles => {
//         res.send(articles)
//       })
//   } else if (key === 'date') {
//     // 根据日期来搜索文章
//     const nextDay = value + 'T24:00:00'
//     db.Article.find({ date: { $gte: new Date(value), $lt: new Date(nextDay) } })
//       .sort({ date: -1 })
//       .limit(4)
//       .skip(skip)
//       .exec()
//       .then(articles => {
//         res.send(articles)
//       })
//   }
// })

module.exports = router
