// Step 1: Create a Vue instance!
import Vue from 'vue'
import serverRenderer from 'vue-server-renderer'

console.log(serverRenderer.default)

const app = new Vue({
  template: `<div>Hello World</div>`
})

const template = `<html>
  <head>
    <title>{{ title }}</title>
  </head>
  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>`

// Step 2: Create a renderer
const renderer = serverRenderer.createRenderer({
  // template: require('fs').readFileSync('./index.template.html', 'utf-8')
  template: template
})

exports.handler = (event, context, callback) => {
  const ssrContext = {
    title: 'Vue SSR Serverless'
  }

  // Step 3: Render the Vue instance to HTML
  renderer.renderToString(app, ssrContext, (err, html) => {
    if (err) throw err

    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: html
    }

    return callback(null, response)
  })
}