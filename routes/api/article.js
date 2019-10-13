const articleService = require('../../service/article.js')
const tagService = require('../../service/tag.js')

const express = require('express')
const router = express.Router()
// const format = require('../../utils/dateutils.js')

// 发布文章
router.post('/api/addArticle', (req, res) => {
  articleService.addArticle(req.body, function(err, article) {
    if (err) {
      console.log('[插入失败！] - ', err.message)
    } else if (article) {
      console.log('[插入成功！]')
      res.status(200).send('插入成功!', { code: 0 })
      tagService.addTag(req.body, function(err, tags) {
        if (err) {
          console.log('[插入标签失败！] - ', err.message)
        } else if (tags) {
          console.log('[插入标签成功！]')
          res.status(200).send('插入成功!', { code: 0 })
        }
      })
    } else {
      res.status(404).send(err.message)
    }
  })
})

// 获取文章列表
router.get('/api/articles', (req, res) => {
  articleService.getArticleList(req, function(err, article) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message)
      return
    } else if (article) {
      res.status(200).send({
        code: 0,
        list: article
      })
    } else {
      res.status(404).send('no data!')
    }
  })
})

// 获取某篇文章
router.get('/api/article', (req, res) => {
  articleService.getArticleById(req.query.aid, function(err, articles) {
    if (err) {
      console.log('[查询失败！] - ', err.message)
    } else if (articles) {
      console.log('[查询成功！]')
      tagService.getTagsByTitle(articles[0].title, function(err, tags) {
        res.status(200).send({
          code: 0,
          article: articles[0],
          tags: tags
        })
      })
    } else {
      res.status(404).send(err.message)
    }
  })
})

// 删除文章
router.delete('/api/delArticle', (req, res) => {
  articleService.getArticleById(req.body.aid, function(err, articles) {
    if (err) {
      console.log('[查询失败！] - ', err.message)
    } else if (articles) {
      console.log('[查询成功！]')
      res.status(200).send('查询成功!', { code: 0 })
      tagService.getTagsByTitle(articles[0].title, function(err, tags) {
        if (err) {
          console.log('[查询失败！] - ', err.message)
        } else if (tags) {
          tagService.removeTag(tags, function(err, tags) {
            if (err) {
              console.log('[删除标签失败！] - ', err.message)
            } else if (tags) {
              console.log('[删除标签成功！]')
              articleService.delArticleById(req.body.aid, function(
                err,
                article
              ) {
                if (err) {
                  console.log('[删除失败！] - ', err.message)
                  return
                } else if (article) {
                  res.status(200).send('删除成功', {
                    code: 0
                  })
                } else {
                  res.status(404).send(err.message)
                }
              })
            }
          })
        }
      })
    } else {
      res.status(404).send(err.message)
    }
  })
})

// 更新文章
router.post('/api/updateArticle', (req, res) => {
  // let updateSqlParams = [
  //   req.body.title,
  //   req.body.author,
  //   req.body.content,
  //   req.body.aid
  // ]
  tagService.getTagsByTitle(req.body.title, function(err, tags) {
    if (err) {
      console.log('[查询失败！] - ', err.message)
    } else if (tags) {
      // console.log(12121, req.body.tagName)
      tags.forEach(item => {
        req.body.tagName.forEach(tagName => {
          // console.log(333, item.tag_name)
          // console.log(222, tagName.tag_name)
          if (tagName.tag_name !== item.tag_name) {
            tagService.addTag(req.body, function(err, tags) {
              if (err) {
                console.log('[插入标签失败！] - ', err.message)
              } else if (tags) {
                console.log('[插入标签成功！]')
                res.status(200).send('插入成功!', {
                  code: 0
                })
              }
            })
          }
          if (item.tag_name !== tagName.tag_name) {
            // tagService.removeTag([req.body.title, tagName.tag_name], function(
            //   err,
            //   tags
            // ) {
            //   if (err) {
            //     console.log('[删除标签失败！] - ', err.message)
            //   } else if (tags) {
            //     console.log('[删除标签成功！] - ', tags)
            //   }
            // })
          }
        })
      })
    } else {
      res.status(404).send(err.message)
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
})

// 按照标题搜索文章
router.get('/api/someArticles', (req, res) => {
  console.log(req.query.key)
  articleService.searchArticleByTitle(req.query.key, function(err, result) {
    if (err) {
      console.log('[搜索失败！] - ', err.message)
      return
    } else if (result) {
      res.status(200).send({
        code: 0,
        list: result
      })
    } else {
      res.status(404).send(err.message)
    }
  })
})

module.exports = router
