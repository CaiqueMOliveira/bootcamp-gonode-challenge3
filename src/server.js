const express = require('express')
const { ValidationError } = require('express-validation')
const mongoose = require('mongoose')
const Youch = require('youch')
const Sentry = require('@sentry/node')
const databaseConfig = require('./config/database.js')
const sentryConfig = require('./config/sentry')

class App {
  constructor () {
    this.express = express()
    this.isDevelopmentEnvironment = process.env.NODE_ENV !== 'production'

    this.sentry()
    this.database()
    this.middlewares()
    this.routes()
    this.exceptions()
  }

  sentry () {
    Sentry.init(sentryConfig)
  }

  database () {
    mongoose.connect(databaseConfig.uri, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
  }

  middlewares () {
    this.express.use(express.json())
    this.express.use(Sentry.Handlers.requestHandler())
  }

  routes () {
    this.express.use(require('./routes'))
  }

  exceptions () {
    if (process.env.NODE_ENV === 'production') {
      this.express.use(Sentry.Handlers.errorHandler())
    }

    this.express.use(async (error, req, res, next) => {
      if (error instanceof ValidationError) {
        return res.status(error.status).json(error)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(error)

        return res.json(await youch.toJSON())
      }

      return res
        .status(error.status || 500)
        .json({ error: 'Internal Server Error' })
    })
  }
}

module.exports = new App().express
