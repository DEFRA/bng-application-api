const { when, resetAllWhenMocks } = require('jest-when')
const { get } = require('../../../app/applications')
const { models } = require('../../../app/data')

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

describe('test application repository get', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    resetAllWhenMocks()
    Date.now.mockReturnValue(1691159039)
  })

  test('get should return application session', async () => {
    when(models.application_session.findOne)
      .calledWith({
        where: {
          reference: 'BNGREG-1234-5678',
          email: 'test@example.com'
        }
      })
      .mockResolvedValue(mockApplication)

    const res = await get('BNGREG-1234-5678', 'test@example.com')

    expect(models.application_session.findOne).toHaveBeenCalledTimes(1)
    expect(models.application_session.findOne).toHaveBeenCalledWith({
      where: {
        reference: 'BNGREG-1234-5678',
        email: 'test@example.com'
      }
    })
    expect(res).toEqual(mockApplication)
  })
})
