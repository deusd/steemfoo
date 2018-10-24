import _, { cloneDeep } from 'lodash'
import { createAction } from 'redux-action'
import { authorize } from 'react-native-app-auth'
import { pending, resolve, reject } from '../../utilities/reducer'
import { SIGN_IN, SIGN_OUT } from '../types'
import { REHYDRATE } from 'redux-persist'
import moment from 'moment'

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
            userName: _.get(remoteUser, 'additionalParameters.username'),
            accessToken: remoteUser.accessToken,
            tokenType: remoteUser.tokenType,
            refreshToken: remoteUser.refreshToken,
          }
          resolve(formattedUser)
        })
        .catch(reason => reject(reason))
    }),
  }
})

export const logout = createAction(SIGN_OUT, () => undefined)

const initialState = () => ({
  signingIn: false,
})

export default (state = initialState(), action) => {
  let newState = cloneDeep(state)
  switch (action.type) {
    case pending(SIGN_IN): // eslint-disable-line
      newState = {
        ...newState,
        signingIn: true,
        signinError: undefined,
        user: undefined,
      }
      break
    case resolve(SIGN_IN): {
      newState = {
        ...newState,
        signingIn: false,
        user: action.payload,
        signinError: undefined,
      }
      break
    }
    case reject(SIGN_IN):
      newState = {
        ...newState,
        signingIn: false,
        signinError: action.payload,
        user: undefined,
      }
      break
    case REHYDRATE:
      newState = cloneDeep(action.payload.steemUser)
      newState.signingIn = false
      newState.signinError = undefined
      break
    default:
      break
  }

  // check if user is expired after each action
  if (newState.user) {
    if (moment().isAfter(newState.user.accessTokenExpirationDate)) {
      newState.user = undefined
    }
  }
  return newState
}
