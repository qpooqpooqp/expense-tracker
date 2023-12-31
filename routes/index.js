const express = require('express')
const router = express.Router()
const records = require('./modules/records')
const users = require('./modules/users')
const home = require('./modules/home')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth') // 掛載 middleware
router.use('/records', authenticator, records) // 加入驗證程序
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home) // 加入驗證程序
module.exports = router
