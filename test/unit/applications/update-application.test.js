const { when, resetAllWhenMocks } = require('jest-when')
const { update } = require('../../../app/applications')
const { models } = require('../../../app/data')

jest.mock('../../../app/data')

Date.now = jest.fn()

models.application_session.findOne = jest.fn()
models.application_session.create = jest.fn()
models.application_session.update = jest.fn()
models.application_session.destroy = jest.fn()

const mockApplication = {
  landownerGainSiteRegistration: {
    applicant: {
      firstName: 'Bob',
      lastName: 'Random',
      emailAddress: 'bob@example.com',
      contactId: '2'
    },
    gainSiteReference: 'REF-1234',
    habitatWorkStartDate: '01/01/2023',
    landBoundaryGridReference: 'ST1234',
    landBoundaryHectares: '12',
    legalAgreementParties: [
      {
        name: 'Bob',
        role: 'Landowner'
      }
    ],
    otherLandowners: [
      {
        name: 'Alice'
      }
    ],
    legalAgreementType: 'string',
    legalAgreementStartDate: '01/01/2023',
    managementMonitoringStartDate: '01/01/2023',
    submittedOn: '08/04/2023'
  }
}

describe('test application repository update', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    resetAllWhenMocks()
    Date.now.mockReturnValue(1691159039)
  })

  test('update should merge stored session with payload', async () => {
    when(models.application_session.findOne)
      .calledWith({
        where: {
          reference: 'BNGREG-1234-5678',
          email: 'bob@example.com'
        }
      })
      .mockResolvedValue({
        dataValues: {
          applicationSession: mockApplication
        }
      })

    const updatePayload = {
      landownerGainSiteRegistration: {
        files: [
          {
            contentMediaType: 'application/ms-excel',
            fileType: 'xlsx',
            fileSize: '100',
            fileLocation: 'blob',
            fileName: 'metric'
          }
        ]
      }
    }

    const mergedPayload = {
      landownerGainSiteRegistration: {
        applicant: {
          firstName: 'Bob',
          lastName: 'Random',
          emailAddress: 'bob@example.com',
          contactId: '2'
        },
        files: [
          {
            contentMediaType: 'application/ms-excel',
            fileType: 'xlsx',
            fileSize: '100',
            fileLocation: 'blob',
            fileName: 'metric'
          }
        ],
        gainSiteReference: 'REF-1234',
        habitatWorkStartDate: '01/01/2023',
        landBoundaryGridReference: 'ST1234',
        landBoundaryHectares: '12',
        legalAgreementParties: [
          {
            name: 'Bob',
            role: 'Landowner'
          }
        ],
        otherLandowners: [
          {
            name: 'Alice'
          }
        ],
        legalAgreementType: 'string',
        legalAgreementStartDate: '01/01/2023',
        managementMonitoringStartDate: '01/01/2023',
        submittedOn: '08/04/2023'
      }
    }

    Date.now.mockReturnValue(1691159501)

    await update('BNGREG-1234-5678', 'bob@example.com', updatePayload)

    expect(models.application_session.findOne).toHaveBeenCalledTimes(1)
    expect(models.application_session.findOne).toHaveBeenCalledWith({
      where: {
        reference: 'BNGREG-1234-5678',
        email: 'bob@example.com'
      }
    })

    expect(models.application_session.update).toHaveBeenCalledTimes(1)
    expect(models.application_session.update).toHaveBeenCalledWith({
      applicationSession: mergedPayload,
      updatedAt: 1691159501
    },
    {
      where: {
        reference: 'BNGREG-1234-5678',
        email: 'bob@example.com'
      }
    })
  })

  test('update should return null if no application found', async () => {
    when(models.application_session.findOne)
      .calledWith({
        where: {
          reference: 'BNGREG-1234-5678',
          email: 'bob@example.com'
        }
      })
      .mockResolvedValue(null)

    const res = await update('BNGREG-1234-5678', 'bob@example.com', null)

    expect(models.application_session.update).toHaveBeenCalledTimes(0)
    expect(res).toEqual(null)
  })
})
