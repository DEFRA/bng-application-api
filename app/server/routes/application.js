const Joi = require('joi')
const { get } = require('../../repositories/application-session')
const createSchema = require('./schemas/create-application')

module.exports = [{
  method: 'GET',
  path: '/applications/{applicationReference}',
  options: {
    description: 'Get todo',
    notes: 'Returns a todo item by the id passed in the path',
    tags: ['api'],
    validate: {
      params: Joi.object({
        applicationReference: Joi.string().valid()
      }),
      query: Joi.object({
        email: Joi.string().email().valid()
      }),
      failAction (request, h, err) {
        console.log(err)
        return h.response('error').code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const applicationReference = request.params.applicationReference
      const email = request.query.email
      const response = await get(applicationReference, email)

      if (response === null) {
        return h.response().code(204)
      }

      return h.response(response).code(200)
    }
  }
},
{
  method: 'GET',
  path: '/applications/expiring',
  handler: (request, h) => {
    return h.response('ok').code(200)
  }
},
{
  method: 'POST',
  path: '/applications',
  options: {
    validate: {
      payload: Joi.object().concat(createSchema),
      failAction: async (request, h, err) => {
        console.log(err)
        return h.response('Error').code(500).takeover()
      }
    },
    handler: (request, h) => {
      return h.response('ok').code(200)
    }
  }
},
{
  method: 'DELETE',
  path: '/applications/{applicationReference}',
  options: {
    validate: {
      params: Joi.object({
        applicationReference: Joi.string().valid()
      }),
      query: Joi.object({
        email: Joi.string().email().valid()
      }),
      failAction (request, h, err) {
        return h.response('error').code(400).takeover()
      }
    },
    handler: (request, h) => {
      const applicationReference = request.params.applicationReference
      const email = request.query.email
      return h.response({ applicationReference, email }).code(200)
    }
  }
},
{
  method: 'PUT',
  path: '/applications/{applicationReference}',
  options: {
    validate: {
      params: Joi.object({
        applicationReference: Joi.string().valid()
      }),
      query: Joi.object({
        email: Joi.string().email().valid()
      }),
      failAction (request, h, err) {
        return h.response('error').code(400).takeover()
      }
    },
    handler: (request, h) => {
      const applicationReference = request.params.applicationReference
      const email = request.query.email
      return h.response({ applicationReference, email }).code(200)
    }
  }
}]
