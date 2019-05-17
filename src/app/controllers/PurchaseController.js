const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')

class PurchaseController {
  async store (req, res) {
    const { adId, messageToSeller } = req.body

    const foundAd = await Ad.findById(adId).populate('author')

    await Mail.sendMail({
      from: '"Caique Oliveira" <caique.m.oliveira.br@gmail.com>',
      to: foundAd.author.email,
      subject: `New order: ${foundAd.title}`,
      html: `Testing: ${messageToSeller}`
    })

    return res.send()
  }
}

module.exports = new PurchaseController()
