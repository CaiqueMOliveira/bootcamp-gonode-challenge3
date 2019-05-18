const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async sendMail (jobs, done) {
    const { foundAd, client, messageToSeller } = jobs.data

    await Mail.sendMail({
      from: '"Caique Oliveira" <caique.m.oliveira.br@gmail.com>',
      to: foundAd.author.email,
      subject: `New order: ${foundAd.title}`,
      template: 'purchase',
      context: {
        client: { ...client, message: messageToSeller },
        seller: foundAd.author,
        ad: foundAd
      }
    })

    return done()
  }
}

module.exports = new PurchaseMail()
