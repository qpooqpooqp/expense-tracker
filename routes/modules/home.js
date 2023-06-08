// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 record model
const Record = require('../../models/record')
// 定義首頁路由
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(records => res.render('index', { records }))
    .catch(error => console.error(error))
})
// 匯出路由模組
module.exports = router
