export default function customLogger (tokens, req, res) {
	const log = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')

  if (process.env.NODE_ENV !== 'dev') {
  	// Log only in AWS context to get back function logs
  	console.log(log)
  }
  return log
}