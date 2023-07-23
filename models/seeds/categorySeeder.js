const Category = require('../category')
const db = require('../../config/mongoose')
const CATEGORY = {
  家居物業: ['https://fontawesome.com/icons/home?style=solid', 'fa-house'],
  交通出行: ['https://fontawesome.com/icons/shuttle-van?style=solid', 'fa-van-shuttle'],
  休閒娛樂: ['https://fontawesome.com/icons/grin-beam?style=solid', 'fa-face-grin-beam'],
  餐飲食品: ['https://fontawesome.com/icons/utensils?style=solid', 'fa-utensils'],
  其他: ['https://fontawesome.com/icons/pen?style=solid', 'fa-pen']
}

const CATEGORY_SEED_DATA = [
  { name: '家居物業' }, { name: '交通出行' }, { name: '休閒娛樂' }, { name: '餐飲食品' }, { name: '其他' }
]

// 增加link到 CATEGORY_SEED_DATA
CATEGORY_SEED_DATA.forEach(data => data.icon = CATEGORY[data.name][1])

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', async () => {
  for (let i = 0; i < CATEGORY_SEED_DATA.length; i++) {
    await Category.create(CATEGORY_SEED_DATA[i])
  }
  process.exit()
})
