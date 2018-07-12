import React from "react"
import { renderToString } from "react-dom/server"
import App from "./react-app/App"
import fetchData from "./react-app/usersData"

exports.handler = (event, context, callback) => {
  // Make API call
  fetchData().then(users => {
    // then render react app
    const react = renderToString(<App data={users} />)
    // then send back html
    return callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: makeHtml({
        title: 'React SSR!',
        body: react
      })
    })
  })
}

function makeHtml ({ body, styles, title }) {
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
