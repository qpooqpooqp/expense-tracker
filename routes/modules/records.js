const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', async (req, res) => {
  const categories = await Category.find().lean()
  return res.render('new', { categories })
})

router.post('/', (req, res) => {
  const userId = req.user._id
  return Record.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', async (req, res) => {
  const categories = await Category.find().lean()
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .lean()
    // .then(record => console.log(record))
    .then(record => res.render('edit', {
      record,
      categories,
      categoryId: record.categoryId - 1
    }
    ))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOneAndUpdate({ _id, userId }, req.body, { new: true })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
