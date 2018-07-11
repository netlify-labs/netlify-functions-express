import express from 'express'
import awsServerlessExpress from 'aws-serverless-express'
import binaryMimeTypes from './utils/binaryMimeTypes'
import expressApp from './app'

// We need to define our function name for
const functionName = 'aws-serverless'
console.log('__filename', __filename)
const app = expressApp(functionName)

const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes)

exports.handler = (event, context) => {
	return awsServerlessExpress.proxy(server, event, context)
}