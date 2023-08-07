const { create } = require('../../../app/applications')
const { models } = require('../../../app/data')
const { generate } = require('../../../app/lib/create-reference')

jest.mock('../../../app/data')
jest.mock('../../../app/lib/create-reference')

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

describe('test application repository add', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    Date.now.mockReturnValue(1691159039)
    generate.mockReturnValue('BNGREG-1234-5678')
  })

  test('create should add new application', async () => {
    await create(mockApplication)

    expect(models.application_session.create).toHaveBeenCalledTimes(1)
    expect(models.application_session.create).toHaveBeenCalledWith({
      reference: 'BNGREG-1234-5678',
      email: 'bob@example.com',
      applicationSession: mockApplication,
      createdAt: 1691159039,
      updatedAt: 1691159039
    })
  })
})
