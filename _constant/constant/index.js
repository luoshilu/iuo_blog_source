
const admin = require('./admin')
const mobile = require('./mobile')
const serve = require('./serve')
const common = require('./common')

exports.admin = admin
exports.mobile = mobile
exports.serve = serve

// 将公共变量放置于最外层
for (let key in common) {
  exports[key] = common[key]
}