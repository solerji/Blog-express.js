const moment = require('moment')
// 时间格式化的方法之一，但暂时没有使用在工程
function format(time) {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

module.exports = format
