import express from 'express'
import awsServerlessExpress from 'aws-serverless-express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'

const app = express()
const router = express.Router()

router.use(compression())

app.use(morgan('combined'))

router.get('/users', (req, res) => {
  res.json({
  	users: [{
  		name: 'steve'
  	}, {
  		name: 'joe',
  	}]
  })
})

router.get('/', (req, res) => {
	console.log('home route hit')
	const html = `
	<html>
		<head>
		</head>
		<body>
			<h1>
				⊂◉‿◉つ I'm using Express in a lambda via 'aws-serverless-express'
			</h1>

			<a href='/.netlify/functions/aws-serverless-express/users'>View users route</a>
		</body>
	</html>
	`

  res.send(html)
})

router.get('/hello/', function(req, res){
  res.send('hello world')
})

app.use('/.netlify/functions/aws-serverless-express/', router)

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

exports.handler = (event, context) => {
	return awsServerlessExpress.proxy(server, event, context)
}