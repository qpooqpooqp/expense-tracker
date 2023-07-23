const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register',
  [
    check('email').trim().notEmpty().withMessage('請輸入你的Email').isEmail().withMessage('請輸入有效的Email'),
    check('password').trim().isLength({ min: 8 }).withMessage('密碼長度不可小於8個位元').isString().withMessage('請輸入有效的密碼'),
    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('密碼和確認密碼不相符')
      }
      return true
    })
  ],
  (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).render('register', {
        errorMessages: errors.array(),
        name,
        email,
        password,
        confirmPassword
      })
    }
    User.findOne({ email }).then(user => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了' })
        res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
  })

router.get('/logout', (req, res) => {
  req.logout()
  // }function (err) {
  //   if (err) { return next(err) }
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})
module.exports = router
