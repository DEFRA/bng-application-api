const { models } = require('../data')
const generateReference = require('../lib/create-reference')

const create = async (payload) => {
  return models.application_session.create({
    reference: generateReference(),
    email: payload.landownerGainSiteRegistration.applicant.emailAddress,
    applicationSession: payload,
    createdAt: Date.now(),
    updatedAt: Date.now()
  })
}

module.exports = create
