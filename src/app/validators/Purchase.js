const joi = require('joi')

module.exports = {
  body: {
    adId: joi.string().required(),
    messageToSeller: joi.string().required()
  }
}
