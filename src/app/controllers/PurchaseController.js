const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')

class PurchaseController {
  async store (req, res) {
    const { adId, messageToSeller } = req.body

    const foundAd = await Ad.findById(adId).populate('author')
    const client = await User.findById(req.userId)

    await Mail.sendMail({
      from: '"Caique Oliveira" <caique.m.oliveira.br@gmail.com>',
      to: foundAd.author.email,
      subject: `New order: ${foundAd.title}`,
      template: 'purchase',
      context: {
        client: { ...client._doc, message: messageToSeller },
        seller: foundAd.author,
        ad: foundAd
      }
    })

    return res.send()
  }
}

module.exports = new PurchaseController()
