const articleService = require('../../service/article.js')
const tagService = require('../../service/tag.js')

const express = require('express')
const router = express.Router()
// const format = require('../../utils/dateutils.js')

// 获取文章分页数据
router.post('/api/getPage', async (req, res) => {
  let result = await articleService.getArticlePage(req.body)
  if (result) {
    let count = await articleService.getCount()
    if (count) {
      console.log(count)
      res.status(200).send({
        code: 0,
        list: result,
        count: count
      })
    }
  } else {
    res.status(500).send('服务器端错误!', err.message)
  }
})

// 发布文章
router.post('/api/addArticle', async (req, res) => {
  let rows = await articleService.addArticle(req.body)
  if (rows) {
    let addSuccess = await tagService.addTag(req.body)
    console.log(444, addSuccess)
    if (addSuccess) {
      console.log('[插入标签成功！]')
      res.status(200).send({
        code: '0'
      })
    }
  }
})

// 获取文章列表
router.get('/api/articles', async (req, res) => {
  let result = await articleService.getArticleList(req)
  if (result) {
    res.status(200).send({
      code: 0,
      list: result
    })
  } else {
    res.status(500).send('服务器端错误!', err.message)
  }
})

// 获取某篇文章
router.get('/api/article', async (req, res) => {
  let rows = await articleService.getArticleById(req.query.aid)
  if (rows) {
    console.log('[查询成功！]')
    let tags = await tagService.getTagsByTitle(rows[0].title)
    if (tags) {
      res.status(200).send({
        code: 0,
        article: rows[0],
        tags: tags
      })
    }
  } else {
    res.status(500).send('服务器端错误!', err.message)
  }
})

// 删除文章
router.delete('/api/delArticle', async (req, res) => {
  let article = await articleService.getArticleById(req.body.aid)
  if (article) {
    console.log('[查询文章成功！]')
    let tag = article[0].title
    let remove = await tagService.removeTag(tag)
    if (remove) {
      console.log('[删除标签成功！]')
      let del = await articleService.delArticleById(req.body.aid)
      if (del) {
        console.log('[已经删除了整篇文章！]')
        res.status(200).send({
          code: '0'
        })
      }
    }
  }
})

// articleService.getArticleById(req.body.aid, function(err, articles) {
//   if (err) {
//     console.log('[查询失败！] - ', err.message)
//   } else if (articles) {
//     console.log('[查询成功！]')
//     res.status(200).send('查询成功!', { code: 0 })
//     tagService.getTagsByTitle(articles[0].title, function(err, tags) {
//       if (err) {
//         console.log('[查询失败！] - ', err.message)
//       } else if (tags) {
//         tagService.removeTag(tags, function(err, tags) {
//           if (err) {
//             console.log('[删除标签失败！] - ', err.message)
//           } else if (tags) {
//             console.log('[删除标签成功！]')
//             articleService.delArticleById(req.body.aid, function(
//               err,
//               article
//             ) {
//               if (err) {
//                 console.log('[删除失败！] - ', err.message)
//                 return
//               } else if (article) {
//                 res.status(200).send('删除成功', {
//                   code: 0
//                 })
//               } else {
//                 res.status(404).send(err.message)
//               }
//             })
//           }
//         })
//       }
//     })
//   } else {
//     res.status(404).send(err.message)
//   }
// })

// 更新文章
router.post('/api/updateArticle', async (req, res) => {
  let rows = await tagService.getTagsByTitle(req.body.title)
  if (rows) {
    console.log('[查询标签成功！]')
    let remove = await tagService.removeTag(req.body.title)
    if (remove) {
      console.log('[删除标签成功！]')
      let addIt = await tagService.addTag(req.body)
      if (addIt) {
        console.log('[插入标签成功！]')
        let update = await articleService.updateArticleById(req.body)
        if (update) {
          console.log('[更新文章成功！] ')
          res.status(200).send({
            code: '0'
          })
        }
      }
    }
  }
})

// tagService.removeTag([req.body.title, req.body.tagName], function(
//   err,
//   tags
// ) {
//   console.log('[删除标签成功！] - ', tags)
// })
// articleService.updateArticleById(req.body, function(err, article) {
//   if (err) {
//     console.log('[更新文章失败！] - ', err.message)
//   } else if (article) {
//     // console.log('[查询成功！]')
//   } else {
//     res.status(404).send(err.message)
//   }
// })
// connection.query(updateSql, updateSqlParams, function(err, doc) {
//   if (err) {
//     console.log('[更新文章失败！] - ', err.message)
//     return
//   } else if (doc) {
//     req.body.tagName.forEach(item => {
//       let updateOneTag = [item, req.body.title]
//       connection.query(updateTagsSql, updateOneTag, function(err, tag) {
//         if (err) {
//           console.log('[更新标签失败！] - ', err.message)
//           return
//         } else if (tag) {
//           console.log('[更新成功！] - ', updateOneTag)
//         } else {
//           res.status(404).send(err.message)
//         }
//       })
//     })
//     res.status(200).send('更新成功')
//   } else {
//     res.status(404).send(err.message)
//   }
// })
// })

// 按照标题搜索文章
router.get('/api/someArticles', async (req, res) => {
  console.log(req.query.key)
  let search = await articleService.searchArticleByTitle(req.query.key)
  if (search) {
    console.log('[搜索成功！]')
    res.status(200).send({
      code: 0,
      list: search
    })
  } else {
    res.status(500).send('服务器端错误!', err.message)
  }
})

module.exports = router
