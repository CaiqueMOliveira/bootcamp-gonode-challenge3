const User = require('../models/User')

class SessionController {
  async store (req, res) {
    const { email, password } = req.body

    const foundUser = await User.findOne({ email })

    if (!foundUser) return res.status(400).json({ error: 'User not found' })

    if (!(await foundUser.isValidPassword(password))) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    return res.json({ foundUser, token: User.generateToken(foundUser) })
  }
}

module.exports = new SessionController()
