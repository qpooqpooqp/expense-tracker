const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const autoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema
const userSchema = new Schema({
  _id: Number,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
userSchema.plugin(autoIncrement, { id: 'user_id_counter', inc_field: '_id' })

module.exports = mongoose.model('User', userSchema)
