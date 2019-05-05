const User = require('../models/User')

class UserController {
  async store (req, res) {
    const { email } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const newCreatedUser = await User.create(req.body)

    return res.json(newCreatedUser)
  }
}

module.exports = new UserController()
