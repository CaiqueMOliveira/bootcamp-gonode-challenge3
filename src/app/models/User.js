const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret, ttl } = require('../../config/auth')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.methods = {
  isValidPassword (passwordToBeCompared) {
    return bcrypt.compare(passwordToBeCompared, this.password)
  }
}

UserSchema.statics = {
  generateToken ({ id }) {
    return jwt.sign({ id }, secret, { expiresIn: ttl })
  }
}

async function encryptPassword (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 8)
}

UserSchema.pre('save', encryptPassword)

module.exports = mongoose.model('User', UserSchema)
