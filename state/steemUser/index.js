import { cloneDeep } from 'lodash'
import { createAction } from 'redux-action'
import { authorize } from 'react-native-app-auth'
import { pending, resolve, reject } from '../../utilities/reducer'
import { SIGN_IN, SIGN_OUT } from '../types'

const config = {
  issuer: 'https://steemconnect.com/oauth2/',
  clientId: 'vybe',
  redirectUrl: 'io.wevybe.app://oauthredirect.login',
  scopes: ['offline'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://steemconnect.com/oauth2/authorize',
    tokenEndpoint: 'https://wevybe.herokuapp.com/loginWithAccessToken',
    revocationEndpoint: 'https://steemconnect.com/oauth2/token/revoke',
  },
}

export const login = createAction(SIGN_IN, () => {
  return {
    promise: new Promise((resolve, reject) => {
      authorize(config)
        .then(remoteUser => {
          const formattedUser = {
            accessTokenExpirationDate: remoteUser.accessTokenExpirationDate,
            idToken: remoteUser.idToken,
            userName: (remoteUser.additionalParameters || {}).username,
            accessToken: 'string',
            tokenType: 'string',
            refreshToken: 'string',
          }
          resolve(formattedUser)
        })
        .catch(reason => reject(reason))
    }),
  }
})

export const logout = createAction(SIGN_OUT, () => null)

const initialState = () => ({
  user: null,
  signingIn: false,
  signinError: null,
})

export default (state = initialState(), action) => {
  let newState = cloneDeep(state)
  switch (action.type) {
    case pending(SIGN_IN): // eslint-disable-line
      newState = { ...newState, signingIn: true, signinError: null, user: null }
      break
    case resolve(SIGN_IN): {
      newState = {
        ...newState,
        signingIn: false,
        user: action.payload,
        signinError: null,
      }
      break
    }
    case reject(SIGN_IN):
      newState = {
        ...newState,
        signingIn: false,
        signinError: action.payload,
        user: null,
      }
      break
    default:
      break
  }

  return newState
}
