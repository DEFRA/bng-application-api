module.exports = {
  method: 'POST',
  path: '/applications/developer/process',
  handler: (request, h) => {
    return h.response('ok').code(200)
  }
}
