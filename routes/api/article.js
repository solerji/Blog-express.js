const articleService = require('../../service/article.js')
const tagService = require('../../service/tag.js')

const express = require('express')
const router = express.Router()
// var logger = require('../../log/logger.js')
// const format = require('../../utils/dateutils.js')

// 获取文章分页数据
router.post('/api/getPage', async (req, res) => {
  try {
    var result = await articleService.getArticlePage(req.body)
  } catch (err) {
    res.status(500).send('服务器端错误!', err.message)
    return
    // console.log(err)
  }
  try {
    let count = await articleService.getCount()
    // logger.info(count)
    res.status(200).send({
      code: 0,
      list: result,
      count: count
    })
  } catch (err) {
    res.status(500).send('服务器端错误!', err.message)
    return
    // console.log(err)
  }
})

// 发布文章
router.post('/api/addArticle', async (req, res) => {
  try {
    await articleService.addArticle(req.body)
  } catch (err) {
    // console.log(err)
    res.status(500).send('服务器端错误!', err.message)
    return
  }
  var tagItem = req.body.tagName
  var item = ''
  for (var i = 0; i <= tagItem.length; i++) {
    item = tagItem[i]
    var params = [item, req.body.title]
    if (params[0] !== undefined) {
      try {
        await tagService.addTag(params)
        // console.log('[插入标签成功！]')
      } catch (err) {
        // console.log(err)
        res.status(500).send('服务器端错误!', err.message)
        return
      }
    }
  }
  res.status(200).send({
    code: '0'
  })
})

// 获取文章列表
router.get('/api/articles', async (req, res) => {
  try {
    let result = await articleService.getArticleList(req)
    res.status(200).send({
      code: 0,
      list: result
    })
  } catch (err) {
    // console.log(err)
    res.status(500).send('服务器端错误!', err.message)
    return
  }
})

// 获取某篇文章
router.get('/api/article', async (req, res) => {
  try {
    var rows = await articleService.getArticleById(req.query.aid)
    // console.log('[查询成功！]')
  } catch (err) {
    // console.log(err)
    res.status(500).send('服务器端错误!', err.message)
    return
  }
  try {
    let tags = await tagService.getTagsByTitle(rows[0].title)
    res.status(200).send({
      code: 0,
      article: rows[0],
      tags: tags
    })
  } catch (err) {
    // console.log(err)
    res.status(500).send('服务器端错误!', err.message)
    return
  }
})

// 删除文章
router.delete('/api/delArticle', async (req, res) => {
  try {
    let article = await articleService.getArticleById(req.body.aid)
    // console.log('[查询文章成功！]')
    let tag = article[0].title
    await tagService.removeTag(tag)
    try {
      // console.log('[删除标签成功！]')
      try {
        await articleService.delArticleById(req.body.aid)
        // console.log('[已经删除了整篇文章！]')
        res.status(200).send({
          code: '0'
        })
      } catch (err) {
        res.status(500).send('服务器端错误!', err.message)
        return
      }
    } catch (err) {
      res.status(500).send('服务器端错误!', err.message)
      return
    }
  } catch (err) {
    res.status(500).send('服务器端错误!', err.message)
    return
  }
})

// 更新文章
router.post('/api/updateArticle', async (req, res) => {
  try {
    await tagService.getTagsByTitle(req.body.title)
    // console.log('[查询标签成功！]')
  } catch (err) {
    res.status(500).send('服务器端错误!', err.message)
    return
  }
  try {
    await tagService.removeTag(req.body.title)
    // console.log('[删除标签成功！]')
    var tagItem = req.body.tagName
    var item = ''
    for (var i = 0; i <= tagItem.length; i++) {
      item = tagItem[i]
      var params = [item, req.body.title]
      if (params[0] !== undefined) {
        try {
          await tagService.addTag(params)
        } catch (err) {
          res.status(500).send('服务器端错误!', err.message)
          return
        }
      }
    }
    try {
      await articleService.updateArticleById(req.body)
      // console.log('[更新文章成功！] ')
    } catch (err) {
      res.status(500).send('服务器端错误!', err.message)
      return
    }
    res.status(200).send({
      code: '0'
    })
  } catch (err) {
    res.status(500).send('服务器端错误!', err.message)
    return
  }
})

// 按照标题搜索文章
router.get('/api/someArticles', async (req, res) => {
  // console.log(req.query.key)
  try {
    let search = await articleService.searchArticleByTitle(req.query.key)
    // console.log('[搜索成功！]')
    res.status(200).send({
      code: 0,
      list: search
    })
  } catch (err) {
    res.status(500).send('服务器端错误!', err.message)
    return
  }
})

module.exports = router
