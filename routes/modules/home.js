const { select } = require('async')
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  const userId = req.user._id
  const categories = await Category.find().lean()
  const records = await Record.find({ userId }).lean()
  const selectedCategoryId = req.query.categoryId

  // 為了讓records map到category的icon
  let recordCategory = records.map(record => {
    const recordCheck = categories.filter(category => category._id === record.categoryId)
    recordCheck ? record.icon = recordCheck[0].icon : ''
    return record
  }).sort( // 為了讓最新一筆呈現在最上方，所以sort
    function (a, b) {
      // Convert string dates into `Date` objects
      const date1 = new Date(a.date)
      const date2 = new Date(b.date)

      return date2 - date1
    }

  )
  // console.log(recordCategory)
  // 篩選category
  if (selectedCategoryId) {
    recordCategory = recordCategory.filter(r => r.categoryId.toString() === selectedCategoryId)
  }

  // 計算總金額
  const totalAmount = recordCategory.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)

  // selectedCategoryId -1 的目的是，要去跟 #each option裡面的@index 對齊
  res.render('index', { recordCategory, categories, totalAmount, selectedCategoryId: selectedCategoryId - 1 })
})

module.exports = router
