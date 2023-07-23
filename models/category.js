const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.set('strictQuery', false)
const autoIncrement = require('mongoose-sequence')(mongoose)
const categorySchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: true
  },
  icon: String
})

categorySchema.plugin(autoIncrement, { id: 'category_id_counter', inc_field: '_id' })

module.exports = mongoose.model('Category', categorySchema)
