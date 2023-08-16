const Joi = require('joi')
const { get, create, update, remove } = require('../../applications')
const createSchema = require('./schemas/create-application')
const updateSchema = require('./schemas/update-application')

module.exports = [{
  method: 'GET',
  path: '/applications/{applicationReference}',
  options: {
    description: 'Get todo',
    notes: 'Returns a todo item by the id passed in the path',
    tags: ['api'],
    validate: {
      params: Joi.object({
        applicationReference: Joi.string().valid().required()
      }),
      query: Joi.object({
        email: Joi.string().email().valid().required()
      }),
      failAction: (request, h, err) => {
        return h.response().code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const applicationReference = request.params.applicationReference
      const email = request.query.email
      const response = await get(applicationReference, email)

      if (response === null) {
        return h.response().code(404)
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
      failAction: (request, h, err) => {
        return h.response('error').code(400).takeover()
      }
    },
    tags: ['api'],
    handler: async (request, h) => {
      await create(request.payload)
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
        applicationReference: Joi.string().valid().required()
      }),
      query: Joi.object({
        email: Joi.string().email().valid().required()
      }),
      failAction: (request, h, err) => {
        return h.response('error').code(400).takeover()
      }
    },
    tags: ['api'],
    handler: async (request, h) => {
      const applicationReference = request.params.applicationReference
      const email = request.query.email

      const res = await remove(applicationReference, email)

      if (res === null) {
        return h.response().code(404)
      }

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
        applicationReference: Joi.string().valid().required()
      }),
      query: Joi.object({
        email: Joi.string().email().valid().required()
      }),
      payload: Joi.object().concat(updateSchema),
      failAction: (request, h, err) => {
        return h.response('error').code(400).takeover()
      }
    },
    tags: ['api'],
    handler: async (request, h) => {
      const applicationReference = request.params.applicationReference
      const email = request.query.email

      const res = await update(applicationReference, email, request.payload)

      if (res === null) {
        return h.response().code(404)
      }

      return h.response(applicationReference).code(200)
    }
  }
}]
