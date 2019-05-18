const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')
const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const {
  UserController,
  SessionController,
  AdController,
  PurchaseController
} = require('./app/controllers')
const { User, Ad, Purchase, Session } = require('./app/validators')

routes.post('/users', validate(User), handle(UserController.store))
routes.post('/sessions', validate(Session), handle(SessionController.store))

routes.use(authMiddleware)

// ***************** Ads ********************
routes.get('/ads', handle(AdController.index))
routes.get('/ads/:adId', handle(AdController.show))
routes.put('/ads/:adId', validate(Ad), handle(AdController.update))
routes.delete('/ads/:adId', handle(AdController.destroy))
routes.post('/ads', validate(Ad), handle(AdController.store))

// *************** Purchase ******************
routes.post('/purchase', validate(Purchase), handle(PurchaseController.store))

module.exports = routes
