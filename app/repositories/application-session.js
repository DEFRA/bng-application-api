const { models } = require('../data')
const merge = require('lodash.merge');
const generateReference = require('../lib/create-reference')

const get = async (applicationReference, email) => {
  return models.application_session.findOne({
    where: {
      reference: applicationReference,
      email
    }
  })
}

const post = async (payload) => {
  return models.application_session.create({
    reference: generateReference(),
    email: payload.landownerGainSiteRegistration.applicant.emailAddress,
    applicationSession: payload,
    createdAt: Date.now(),
    updatedAt: Date.now()
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
  post,
  put,
  remove
}
