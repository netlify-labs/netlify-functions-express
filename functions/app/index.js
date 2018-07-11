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
		const html = `
			<html>
				<head>
				</head>
				<body>
					<h1>Express via '${functionName}' ⊂◉‿◉つ</h1>

					<p>I'm using Express running via a Netlify Function. Choose a route:</p>

					<div>
						<a href='/.netlify/functions/${functionName}/users'>View /users route</a>
					</div>

					<div>
						<div>
							<a href='/.netlify/functions/${functionName}/hello'>View /hello route</a>
						</div>
					</div>

					<br/>
					<br/>
					<br/>
					<a href='/'>
						Go back to demo homepage
					</a>
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

