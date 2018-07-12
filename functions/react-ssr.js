import serverless from "serverless-http"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import React from "react"
import { renderToString } from "react-dom/server"
import App from "./react-app/App"
import Data from "./react-app/usersData"
import fs from "fs"
import path from "path"

const functionName = 'react-ssr'
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.static(path.resolve(__dirname, "./Browser")))


const markup = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>SSR- React</title>
<link rel="stylesheet" href="/dev/bundle.css">
</head>
<body>
<div id="root"><!--App--></div>

<script src="/dev/bundle.js"></script>
</body>
</html>`

const routerBasePath = (process.env.NODE_ENV === 'dev') ? `/${functionName}` : `/.netlify/functions/${functionName}/`

app.get(routerBasePath, (req, res) => {
  Data().then(users => {
    const html = renderToString(<App data={users} />)
    res.send(markup.replace("<!--App-->", html))
  })
})

exports.handler = serverless(app)
