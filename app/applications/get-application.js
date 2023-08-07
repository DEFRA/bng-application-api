const { models } = require('../data')

const get = async (applicationReference, email) => {
  return models.application_session.findOne({
    where: {
      reference: applicationReference,
      email
    }
  })
}

module.exports = get
