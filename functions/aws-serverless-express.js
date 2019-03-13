/* example using https://github.com/awslabs/aws-serverless-express */
import awsServerlessExpress from 'aws-serverless-express'
import binaryMimeTypes from './utils/binaryMimeTypes'
import expressApp from './app'

// We need to define our function name for express routes to set the correct base path
const functionName = 'aws-serverless-express'

// Initialize express app
const app = expressApp(functionName)

// Initialize awsServerlessExpress
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes)

// Export Lambda handler
exports.handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context)
}
