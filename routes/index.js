const express = require('express')
const router = express.Router()
const home = require('./modules/home')
// 引入 records 模組程式碼
const records = require('./modules/records')
router.use('/', home)
// 將網址結構符合 /records 字串開頭的 request 導向 records 模組
router.use('/records', records)
module.exports = router
