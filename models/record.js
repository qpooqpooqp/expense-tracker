const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  recordId: {
    type: Number, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  date: {
    type: Date,
    required: true
  },
  amout: {
    type: Number,
    required: true
  },
  userId: { // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    require: true
  }

})
module.exports = mongoose.model('Record', recordSchema)
