const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Purchase = new mongoose.Schema({
  client: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Ad'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

Purchase.plugin(mongoosePaginate)

module.exports = mongoose.model('Purchase', Purchase)
