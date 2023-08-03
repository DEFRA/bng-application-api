const joi = require('joi')

module.exports = joi.object({
  landownerGainSiteRegistration: joi.object({
    applicant: joi.object({
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      emailAddress: joi.string().email().required(),
      contactId: joi.string().required()
    }).required(),
    files: joi.array().items(joi.object({
      contentMediaType: joi.string().required(),
      fileType: joi.string().required(),
      fileSize: joi.string().required(),
      fileLocation: joi.string().required(),
      fileName: joi.string().required()
    })).optional(),
    gainSiteReference: joi.string().required(),
    habitatWorkStartDate: joi.string().required(),
    landBoundaryGridReference: joi.string().required(),
    landBoundaryHectares: joi.string().required(),
    legalAgreementParties: joi.array().items(joi.object({
      name: joi.string().required(),
      role: joi.string().required()
    })).required(),
    otherLandowners: joi.array().items(joi.object({
      name: joi.string().required()
    })).required(),
    legalAgreementType: joi.string().required(),
    legalAgreementStartDate: joi.string().required(),
    managementMonitoringStartDate: joi.string().required(),
    submittedOn: joi.string().required(),
    metricData: joi.object({
      d1: joi.array().items(joi.object().optional()),
      d2: joi.array().items(joi.object().optional()),
      d3: joi.array().items(joi.object().optional()),
      e1: joi.array().items(joi.object().optional()),
      e2: joi.array().items(joi.object().optional()),
      e3: joi.array().items(joi.object().optional()),
      f1: joi.array().items(joi.object().optional()),
      f2: joi.array().items(joi.object().optional()),
      f3: joi.array().items(joi.object().optional())
    }).optional()
  }).required()
})
