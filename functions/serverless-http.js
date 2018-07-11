import serverless from 'serverless-http'
import expressApp from './app'

// We need to define our function name for
const functionName = 'serverless-http'
console.log('__filename', __filename)
const app = expressApp(functionName)

exports.handler = serverless(app)