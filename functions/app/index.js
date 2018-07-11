/* Express App */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import customLogger from '../utils/logger'

/* My express App */
export default function expressApp(functionName) {

	const app = express()
	const router = express.Router()

	// gzip responses
	router.use(compression())

	// Set router base path for local dev
	const routerBasePath = (process.env.NODE_ENV === 'dev') ? `/${functionName}` : `/.netlify/functions/${functionName}/`

	/* define routes */
	router.get('/', (req, res) => {
		console.log('home route hit')
		const html = `
			<html>
				<head>
				</head>
				<body>
					<h1>
						⊂◉‿◉つ I'm using Express in a lambda via '${functionName}'
					</h1>

					<a href='/.netlify/functions/${functionName}/users'>View users</a>
					<br/>

					<a href='/'>Back home</a>

				</body>
			</html>
		`
	  res.send(html)
	})

	router.get('/users', (req, res) => {
	  res.json({
	  	users: [{
	  		name: 'steve'
	  	}, {
	  		name: 'joe',
	  	}]
	  })
	})

	router.get('/hello/', function(req, res){
	  res.send('hello world')
	})

	// Attach logger
	app.use(morgan(customLogger))

	// Setup routes
	app.use(routerBasePath, router)

	// Apply express middlewares
	router.use(cors())
	router.use(bodyParser.json())
	router.use(bodyParser.urlencoded({ extended: true }))

	return app
}

