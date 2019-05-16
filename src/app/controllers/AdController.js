const Ad = require('../models/Ad')

class AdController {
  async index (req, res) {
    const { price_min, price_max, title } = req.query
    const filterToBeAppliedOnPagination = {}

    if (price_max || price_min) {
      filterToBeAppliedOnPagination.price = {}

      if (price_max) filterToBeAppliedOnPagination.price.$lte = price_max
      if (price_min) filterToBeAppliedOnPagination.price.$gte = price_min
    }

    if (title) filterToBeAppliedOnPagination.title = new RegExp(title, 'i')

    const foundAds = await Ad.paginate(filterToBeAppliedOnPagination, {
      page: req.query.page || 1,
      limit: 20,
      populate: ['author'],
      sort: '-createdAt'
    })
    return res.json(foundAds)
  }

  async store (req, res) {
    const newCreatedAd = await Ad.create({ ...req.body, author: req.userId })
    return res.json(newCreatedAd)
  }

  async show (req, res) {
    const foundAd = await Ad.findById(req.params.adId)
    if (!foundAd) return res.status(204).json([])
    return res.json(foundAd)
  }

  async destroy (req, res) {
    await Ad.findByIdAndRemove(req.params.adId)
    return res.send()
  }

  async update (req, res) {
    const updatedAd = await Ad.findByIdAndUpdate(req.params.adId, req.body, {
      new: true
    })
    return res.json(updatedAd)
  }
}

module.exports = new AdController()
