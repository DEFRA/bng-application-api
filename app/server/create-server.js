const hapi = require('@hapi/hapi')
const HapiSwagger = require('hapi-swagger')
const Pack = require('../../package')

const { serverConfig } = require('../config')

const createServer = async () => {
  const server = hapi.server({
    port: serverConfig.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  const swaggerOptions = {
    info: {
      title: 'Test API Documentation',
      version: Pack.version
    }
  }

  await server.register(require('@hapi/inert'))
  await server.register(require('./plugins/errors'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/logging'))
  if (serverConfig.isDev) {
    await server.register(require('blipp'))
    await server.register(require('@hapi/vision'))
    await server.register({
      plugin: HapiSwagger,
      options: swaggerOptions
    })
  }

  return server
}

module.exports = {
  createServer
}
