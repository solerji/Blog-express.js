var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const routes = require('./routes/api/index.js')
// var log4js = require('../log/logger.js')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

routes(app)
// log4js.use(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// 打印内存
console.log('neicun', process.memoryUsage())
const v8 = require('v8')
console.log(v8.getHeapSpaceStatistics())

//防止服务器 崩溃的方式，用这种方式，用于处理在运行时我们没有发现的错误
process.on('uncaughtException', function(err) {
  console.log(err.stack) //把错误放在栈中
})

module.exports = app
