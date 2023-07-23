const User = require('../user')
const Record = require('../record')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const USER_SEED_DATA = { name: '廣志', email: 'user1@example.com', password: '123' }

const RECORD_SEED_DATA = [{ name: '午餐', date: '2019.4.23', amount: 60, categoryId: 4 }]

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  // 將使用者的密碼bcrypt處理
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(USER_SEED_DATA.password, salt))
    .then(hash => {
      USER_SEED_DATA.password = hash
    })
    .then(() => { // 此時USER_SEED_DATA的password已經hash了
      User.create(USER_SEED_DATA)
        .then(user => {
          const userId = user
          return Promise.all(Array.from(
            { length: RECORD_SEED_DATA.length },
            (_, i) => Record.create({ ...RECORD_SEED_DATA[i], userId })
          ))
        })
        .then(() => {
          console.log('done')
          process.exit()
        })
        .catch(error => {
          console.log(error)
        })
    })
})
