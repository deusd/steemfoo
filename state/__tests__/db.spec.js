import moment from 'moment'
import Database from '../db'

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
    database = new Database({ inMemory: true, inMemoryIdentifier: date })
  })

  afterAll(() => {
    database.realm.close()
  })

  it('should return a realm instance when called', () => {
    expect(database.realm).toBeDefined()
  })

  it('should create a user with id 1', () => {
    database.setUser(userSettings)

    expect(database.realm.objects('User')).toHaveLength(1)
  })

  it('should return the created user with settings', () => {
    const user = database.getUser()
    expect(user).toEqual(expect.objectContaining({ ...userSettings, id: 1 }))
  })

  it('should only ever have one user', () => {
    userSettings.userName = 'new user name'
    userSettings.tokenType = 'new token type'
    database.setUser(userSettings)
    const user = database.getUser()
    expect(database.realm.objects('User')).toHaveLength(1)
    expect(user).toEqual(expect.objectContaining({ ...userSettings, id: 1 }))
  })

  it('should be able to remove the user', () => {
    database.removeUser()
    expect(database.realm.objects('User')).toHaveLength(0)
  })

  it('should remove the user if the expiration data has passed', () => {
    userSettings.accessTokenExpirationDate = moment()
      .subtract(3, 'days')
      .format()
    database.setUser(userSettings)
    expect(database.getUser()).toBeUndefined()
    expect(database.realm.objects('User')).toHaveLength(0)
    expect(database.realm.objects('User')).toHaveLength(0)
  })
})
