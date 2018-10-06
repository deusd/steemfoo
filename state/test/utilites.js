import configureMockStore from 'redux-mock-store'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware, promiseMiddleware()]
export const mockStore = configureMockStore(middlewares)

describe('utitilities', () => {
  it('should have a test', () => {
    expect(true).toBe(true)
  })
})
