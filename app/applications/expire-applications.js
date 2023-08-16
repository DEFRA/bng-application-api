const dayjs = require('dayjs')
const { Op } = require("sequelize")
const { models } = require('../data')

const expire = async () => {
  const expireDate = dayjs().subtract('28', 'days').toDate()

  return await models.application_session.update(
    {
      date_of_expiry_notification: dayjs().toDate()
    },
    {
      where: {
        created_at: {
          [Op.lte]: expireDate
        }
      }
    })
}

module.exports = expire
