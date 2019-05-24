const joi = require('joi')

module.exports = {
  params: {
    purchaseId: joi.string().required()
  },
  body: {
    productId: joi.string().required()
  }
}
