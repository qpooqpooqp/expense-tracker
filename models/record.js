const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const autoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema
const recordSchema = new Schema({
  _id: Number,
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    min: 0,
    required: true
  },
  userId: {
    type: Number,
    ref: 'User',
    index: true,
    required: true
  },
  categoryId: {
    type: Number,
    ref: 'Category',
    index: true,
    required: true
  }
})
recordSchema.plugin(autoIncrement, { id: 'record_id_counter', inc_field: '_id' })

module.exports = mongoose.model('Record', recordSchema)
