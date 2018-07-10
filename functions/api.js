import serverless from 'serverless-http'
import express from 'express'

const app = express()

app.get('/yo', (req, res) => {
  res.send('Hello World!')
})

exports.handler = serverless(app)