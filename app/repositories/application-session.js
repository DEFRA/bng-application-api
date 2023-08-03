const { models } = require('../data')
const merge = require('lodash.merge');

const get = async (applicationReference, email) => {
  return models.application_session.findOne({
    where: {
      reference: applicationReference,
      email
    }
  })
}

const put = async (applicationReference, email, payload) => {
  const currentSession = await get(applicationReference, email)

  if (currentSession === null) {
    return null
  }

  const session = merge(currentSession.dataValues.applicationSession, payload)

  console.log(session)

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

const remove = async (applicationReference, email) => {
  const session = await get(applicationReference, email)

  if (session === null) {
    return null
  }

  return session.destroy()
}

module.exports = {
  get,
  put,
  remove
}
