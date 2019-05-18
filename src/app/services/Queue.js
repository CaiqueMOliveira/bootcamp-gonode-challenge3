const kue = require('kue')
const redisConfig = require('../../config/redis')
const { PurchaseMail } = require('../jobs')

const Queue = kue.createQueue({ redis: redisConfig })

Queue.process(PurchaseMail.key, PurchaseMail.sendMail)

module.exports = Queue
