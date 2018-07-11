import serverless from 'serverless-http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import customLogger from './utils/logger'

const app = express()
const router = express.Router()

router.use(compression())

app.use(morgan(customLogger))

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
				⊂◉‿◉つ I'm using Express in a lambda via 'serverless-http'
			</h1>

			<a href='/.netlify/functions/serverless-http/users'>View users</a>
		</body>
	</html>
	`

  res.send(html)
})

router.get('/hello/', function(req, res){
  res.send('hello world')
})

app.use('/.netlify/functions/serverless-http/', router)

router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

exports.handler = serverless(app)