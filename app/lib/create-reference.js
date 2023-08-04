const crypto = require('crypto')

module.exports = () => {
  const id = crypto.randomUUID()
  console.log(id)
  const appRef = id.split('-').shift().toLocaleUpperCase('en-GB').match(/.{1,4}/g).join('-')
  return `BNGREG-${appRef}-A`
}
