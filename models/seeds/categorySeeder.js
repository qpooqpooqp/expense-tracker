const Category = require('../category')
const db = require('../../config/mongoose')
db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Category.create({ name: 'name-' + i })
  }
  console.log('done')
})
