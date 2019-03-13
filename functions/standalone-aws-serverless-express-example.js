import express from 'express'
import awsServerlessExpress from 'aws-serverless-express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware'
import customLogger from './utils/logger'
import binaryMimeTypes from './utils/binaryMimeTypes'

const app = express()
const router = express.Router()

/* We need to set our base path for express to match on our function route */
const functionName = 'standalone-aws-serverless-express-example'
const basePath = `/.netlify/functions/${functionName}/`

router.use(compression())

app.use(morgan(customLogger))

router.get('/users', (req, res) => {
  res.json({
    users: [
      {
        name: 'steve',
      },
      {
        name: 'joe',
      },
    ],
  })
})

router.get('/', (req, res) => {
  const html = `
    <html>
      <head></head>
      <body>
        <h1>
          ⊂◉‿◉つ I'm using Express in a lambda via '${functionName}'
        </h1>

        <a href='/.netlify/functions/${functionName}/users'>
          View users route
        </a>
      </body>
    </html>
  `
  // send back HTML
  res.send(html)
})

app.use(basePath, router)

// Apply express middlewares
router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(awsServerlessExpressMiddleware.eventContext())

// Initialize awsServerlessExpress
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes)

// Export lambda handler
exports.handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context)
}
