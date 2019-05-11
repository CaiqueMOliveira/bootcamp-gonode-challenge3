const Ad = require('../models/Ad')

class AdController {
  async index (req, res) {
    const foundAds = await Ad.find()
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
