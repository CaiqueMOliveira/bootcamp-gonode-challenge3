const express = require('express')
const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const {
  UserController,
  SessionController,
  AdController,
  PurchaseController
} = require('./app/controllers')

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

// ***************** Ads ********************
routes.get('/ads', AdController.index)
routes.get('/ads/:adId', AdController.show)
routes.put('/ads/:adId', AdController.update)
routes.delete('/ads/:adId', AdController.destroy)
routes.post('/ads', AdController.store)

// *************** Purchase ******************
routes.post('/purchase', PurchaseController.store)

module.exports = routes
