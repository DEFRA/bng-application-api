const { models } = require('../data')
const generateReference = require('../lib/create-reference')

const create = async (payload) => {
  const reference = generateReference()
  const email = payload?.landownerGainSiteRegistration?.applicant?.emailAddress

  return models.application_session.create({
    reference,
    email,
    applicationSession: payload,
    createdAt: Date.now(),
    updatedAt: Date.now()
  })
}

module.exports = create
