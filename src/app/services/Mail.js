const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const mailConfig = require('../../config/mail')

const transport = nodemailer.createTransport(mailConfig)

const emailTemplatesPath = path.resolve(__dirname, '..', 'views', 'emails')

transport.use(
  'compile',
  hbs({
    viewEngine: {
      extname: '.hbs',
      defaultLayout: 'purchase',
      partialsDir: path.resolve(emailTemplatesPath, 'partials'),
      viewPath: emailTemplatesPath,
      layoutsDir: emailTemplatesPath
    },
    viewPath: emailTemplatesPath,
    extName: '.hbs'
  })
)

module.exports = transport
