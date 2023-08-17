module.exports = {
  plugin: require('hapi-cron'),
  options: {
    jobs: [{
      name: 'expire applications',
      time: '* * * * *',
      timezone: 'Europe/London',
      request: {
        method: 'PUT',
        url: '/applications/expire'
      }
    }]
  }
}
