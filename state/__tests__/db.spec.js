import Database from '../db'
import Realm from 'realm'

describe('db', () => {
  let date = new Date().getTime()
  beforeAll(() => {
    jest.spyOn(Realm, 'open')
  })

  it('should return a realm instance when called', async () => {
    const database = new Database({ inMemory: true, inMemoryIdentifier: date })
    expect(database.realm).toBeDefined()
  })
})
