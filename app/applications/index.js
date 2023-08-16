const get = require('./get-application')
const create = require('./add-application')
const update = require('./update-application')
const remove = require('./remove-application')
const expire = require('./expire-applications')

module.exports = {
  get,
  create,
  update,
  remove,
  expire
}
