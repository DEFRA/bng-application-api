const { models } = require('../data')
const merge = require('lodash.merge')
const get = require('./get-application')

const update = async (applicationReference, email, payload) => {
  const currentSession = await get(applicationReference, email)

  if (currentSession === null) {
    return null
  }

  const session = merge(currentSession.dataValues.applicationSession, payload)

  return models.application_session.update({
    applicationSession: session,
    updatedAt: Date.now()
  }, {
    where: {
      reference: applicationReference,
      email
    }
  })
}

module.exports = update
