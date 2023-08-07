const get = require('./get-application')

const remove = async (applicationReference, email) => {
  const session = await get(applicationReference, email)

  if (session === null) {
    return null
  }

  return session.destroy()
}

module.exports = remove
