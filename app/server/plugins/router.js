const routes = [].concat(
  require('../routes/application'),
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/process-landowner-application'),
  require('../routes/process-developer-application')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server) => {
      server.route(routes)
    }
  }
}
