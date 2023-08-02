module.exports = {
  method: 'POST',
  path: '/applications/landowner/process',
  handler: (request, h) => {
    return h.response('ok').code(200)
  }
}
