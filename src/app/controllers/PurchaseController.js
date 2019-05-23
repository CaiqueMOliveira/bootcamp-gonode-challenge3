const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { adId, messageToSeller } = req.body

    const foundAd = await Ad.findById(adId).populate('author')

    if (foundAd.purchasedBy) {
      return res
        .status(409)
        .json({ error: 'This product has already been purchased' })
    }

    const client = await User.findById(req.userId)

    const newPurchseCreated = await Purchase.create({
      client,
      product: foundAd
    })

    if (!newPurchseCreated) throw new Error()

    Queue.create(PurchaseMail.key, { foundAd, client, messageToSeller }).save()

    return res.send(newPurchseCreated)
  }
}

module.exports = new PurchaseController()
