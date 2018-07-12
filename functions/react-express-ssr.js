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

const functionName = 'react-express-ssr'
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.static(path.resolve(__dirname, "./Browser")))

const Html = ({ body, styles, title }) => {
  const stylesheet = (styles) ? `<style>${styles}</style>` : ''
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        ${stylesheet}
      </head>
      <body style="margin:0">
        <div id="root">${body}</div>
        <script src="/dev/bundle.js"></script>
      </body>
    </html>
  `
}
const routerBasePath = (process.env.NODE_ENV === 'dev') ? `/${functionName}` : `/.netlify/functions/${functionName}/`

app.get(routerBasePath, (req, res) => {
  Data().then(users => {
    const reactAppHtml = renderToString(<App data={users} />)
    const html = Html({
      title: 'React SSR!',
      body: reactAppHtml
    })
    res.send(html)
  })
})

exports.handler = serverless(app)
