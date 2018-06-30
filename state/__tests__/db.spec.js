import Database from '../db'
import Realm from 'realm'

describe('db', () => {
  let date = new Date().getTime()
  let database

  const userSettings = {
    accessTokenExpirationDate: '2018-07-07T15:44:51-0700',
    idToken: 'id token',
    userName: 'my name',
    accessToken: 'access token',
    tokenType: 'token type',
    refreshToken: 'refresh token',
  }

  beforeAll(() => {
    jest.spyOn(Realm, 'open')
    database = new Database({ inMemory: true, inMemoryIdentifier: date })
  })

  it('should return a realm instance when called', async () => {
    expect(database.realm).toBeDefined()
  })

  it('should create a user with id 1', async () => {
    database.setUser(userSettings)

    expect(database.realm.objects('User')).toHaveLength(1)
  })

  it('should return the created user with settings', async () => {
    const user = database.getUser()
    expect(user).toEqual(expect.objectContaining({ ...userSettings, id: 1 }))
  })

  it('should only ever have one user', async () => {
    userSettings.userName = 'new user name'
    userSettings.tokenType = 'new token type'
    database.setUser(userSettings)
    const user = database.getUser()
    expect(database.realm.objects('User')).toHaveLength(1)
    expect(user).toEqual(expect.objectContaining({ ...userSettings, id: 1 }))
  })

  it('should be able to remove the user', async () => {
    database.removeUser()
    expect(database.realm.objects('User')).toHaveLength(0)
  })
})
