const Ad = require('../models/Ad')
const User = require('../models/User')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { adId, messageToSeller } = req.body

    const foundAd = await Ad.findById(adId).populate('author')
    const client = await User.findById(req.userId)

    Queue.create(PurchaseMail.key, { foundAd, client, messageToSeller }).save()

    return res.send()
  }
}

module.exports = new PurchaseController()
