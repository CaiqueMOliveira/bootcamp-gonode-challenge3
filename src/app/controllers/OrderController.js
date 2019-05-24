const Purchase = require('../models/Purchase')
const Ad = require('../models/Ad')

class OrderController {
  async index (req, res) {
    const filtersToBeAppliedOnPagination = {
      purchasedBy: undefined
    }

    const foundPurchases = await Purchase.paginate(
      filtersToBeAppliedOnPagination,
      {
        page: req.query.page || 1,
        limit: 20,
        populate: [
          'client',
          { path: 'product', populate: { path: 'author', model: 'User' } }
        ],
        sort: '-createdAt'
      }
    )

    return res.json(foundPurchases)
  }

  async setOrderAsPerformed (req, res) {
    const { purchaseId } = req.params
    const { productId } = req.body
    const sellerId = req.userId

    const foundAd = await Ad.findById(productId)

    if (foundAd.purchasedBy) {
      return res.status(409).json({ error: 'This order has already been sold' })
    }
    if (!foundAd.author._id.equals(sellerId)) {
      return res.status(401).json({ error: "You're not the ad owner" })
    }

    foundAd.purchasedBy = purchaseId

    await foundAd.save()

    return res.send()
  }
}

module.exports = new OrderController()
