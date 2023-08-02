require('./insights').setup()
require('log-timestamp')
const { start: startServer } = require('./server')

process.on(['SIGTERM', 'SIGINT'], async () => {
  process.exit(0)
})

module.exports = (async () => {
  await startServer()
})()
