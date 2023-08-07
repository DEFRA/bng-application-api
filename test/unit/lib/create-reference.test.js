const createReference = require('../../../app/lib/create-reference')
const crypto = require('crypto')

jest.spyOn(crypto, 'randomUUID').mockReturnValue('54a2d8d8-e9da-4dc6-9651-0f0ab20b935d')

describe('Test return BNG reference number', () => {
  test('Returns reference number', () => {
    const ref = createReference.generate()

    expect(ref).toEqual('BNGREG-54A2-D8D8-A')
    expect(crypto.randomUUID).toHaveBeenCalledTimes(1)
  })
})
