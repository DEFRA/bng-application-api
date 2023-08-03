const joi = require('joi')

module.exports = joi.object({
  landownerGainSiteRegistration: joi.object({
    files: joi.array().items(joi.object({
      contentMediaType: joi.string().optional(),
      fileType: joi.string().optional(),
      fileSize: joi.string().optional(),
      fileLocation: joi.string().optional(),
      fileName: joi.string().optional()
    })).optional(),
    gainSiteReference: joi.string().optional(),
    habitatWorkStartDate: joi.string().optional(),
    landBoundaryGridReference: joi.string().optional(),
    landBoundaryHectares: joi.string().optional(),
    legalAgreementParties: joi.array().items(joi.object({
      name: joi.string().optional(),
      role: joi.string().optional()
    })).optional(),
    otherLandowners: joi.array().items(joi.object({
      name: joi.string().optional()
    })).optional(),
    legalAgreementType: joi.string().optional(),
    legalAgreementStartDate: joi.string().optional(),
    managementMonitoringStartDate: joi.string().optional(),
    submittedOn: joi.string().optional(),
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
