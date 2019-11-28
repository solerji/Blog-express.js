const loginService = require('../../service/login.js')
const express = require('express')
const router = express.Router()
// const secret = require('../../config').jwt
// const jwt = require('jsonwebtoken')

// const creatToken = (id, name) => {
//   return jwt.sign(
//     {
//       id: id,
//       name: name
//     },
//     secret.cert,
//     { expiresIn: '7d' }
//   )
// }

router.post('/api/login', (req, res) => {
  loginService.login(req, function(err, result) {
    if (err) {
      // console.log('[SELECT ERROR] - ', err.message)
      return
    } else if (result) {
      if (result[0].password === req.body.password) {
        // const token = creatToken(doc._id, doc.name)
        res.status(200).send({
          name: result[0].name,
          id: result[0].id
        })
        // res.status(200).send({
        //   id: result._id,
        //   name: result.name
        //   // token: token
        // })
      } else {
        res.send('error password')
      }
    } else {
      res.status(401).end()
    }
  })
})

module.exports = router
