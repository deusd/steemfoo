import { pending, reject, resolve } from '../reducer'

describe('reducer utilies', () => {
  const type = 'TEST_TYPE'

  it('pending should return the correct string', () => {
    expect(pending(type)).toBe('TEST_TYPE_PENDING') // eslint-disable-line jest/no-disabled-tests
  })

  it('reject should return the correct string', () => {
    expect(reject(type)).toBe('TEST_TYPE_REJECTED')
  })

  it('resolve should return the correct string', () => {
    expect(resolve(type)).toBe('TEST_TYPE_FULFILLED')
  })
})
