const jwt = require('jsonwebtoken')
const { secret } = require('../../config/auth')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) return res.status(401).json({ error: 'Token not provided' })

  const [, token] = authHeader.split(' ')

  try {
    const decodedAuth = await promisify(jwt.verify)(token, secret)

    req.userId = decodedAuth.id

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
