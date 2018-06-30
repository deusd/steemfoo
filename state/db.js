import Realm from 'realm'
import moment from 'moment'

const UserSchema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'int',
    accessTokenExpirationDate: 'string',
    idToken: 'string',
    userName: 'string',
    accessToken: 'string',
    tokenType: 'string',
    refreshToken: 'string',
  },
}

export class Database {
  constructor(config) {
    this.realm = new Realm({ schema: [UserSchema], ...config })
  }

  setUser(userData) {
    this.realm.write(() => {
      this.realm.create('User', { id: 1, ...userData }, true)
    })
  }

  removeUser() {
    this.realm.write(() => {
      const users = this.realm.objects('User')
      this.realm.delete(users)
    })
  }

  getUser() {
    const users = this.realm.objects('User')
    if (users.length > 0) {
      const user = users[0]

      if (moment().isAfter(user.accessTokenExpirationDate)) {
        this.removeUser()
      } else {
        return user
      }
    }

    return undefined
  }
}
