const { models } = require('../data')
const { generate } = require('../lib/create-reference')

const create = async (payload) => {
  const reference = generate()
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
