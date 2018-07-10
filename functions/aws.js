import express from 'express'
import awsServerlessExpress from 'aws-serverless-express'

import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'

const app = express()
const router = express.Router()

router.use(compression())

router.get('/users', (req, res) => {
  res.json({
  	hi: 'yo'
  })
})

app.use('/', router)

router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml'
]
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes)

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)