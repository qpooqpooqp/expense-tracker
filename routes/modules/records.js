const express = require('express')
const router = express.Router()
// 引入 records 模組程式碼
const Record = require('../../models/record')
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name // 從 req.body 拿出表單裡的 name 資料
  return Record.create({ name, userId }) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => res.render('detail', { record }))
    .catch(error => console.log(error))
})
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const name = req.body.name
  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name
      return record.save()
    })
    .then(() => res.redirect(`/records/${_id}`))
    .catch(error => console.log(error))
})
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router
