jest.mock('../../../../app/applications')

const { when, resetAllWhenMocks } = require('jest-when')
const { get, create } = require('../../../../app/applications')

let server

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

describe('Application endpoint tests', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    resetAllWhenMocks()

    const { createServer } = require('../../../../app/server/create-server')
    server = await createServer()

    await server.initialize()
  })

  afterEach(async () => {
    await server.stop()
  })

  test('GET application should return 200 OK', async () => {
    when(get)
      .calledWith({
        applicationReference: 'BNGREG-1234-5678',
        email: 'email=bob@example.com'
      })
      .mockResolvedValue(mockApplication)

    const options = {
      method: 'GET',
      url: '/applications/BNGREG-1234-5678?email=bob@example.com'
    }

    const res = await server.inject(options)

    expect(res.statusCode).toEqual(200)
  })

  test('GET application should return 400 without email', async () => {
    const options = {
      method: 'GET',
      url: '/applications/BNGREG-1234-5678'
    }

    const res = await server.inject(options)

    expect(res.statusCode).toEqual(400)
  })

  test('POST should create application', async () => {
    const options = {
      method: 'POST',
      url: '/applications',
      payload: mockApplication
    }

    const res = await server.inject(options)

    expect(res.statusCode).toEqual(200)
    expect(create).toBeCalledTimes(1)
  })

  test('POST invalid payload should return 400 Bad Request', async () => {
    const options = {
      method: 'POST',
      url: '/applications',
      payload: {}
    }

    const res = await server.inject(options)

    expect(res.statusCode).toEqual(400)
  })
})
