import { authorize } from 'react-native-app-auth'
import moment from 'moment'
import reducer, { login } from '../steem'
import { pending as going, resolve, reject } from '../../utilities/reducer'
import database from '../../utilities/database'
import * as types from '../types'
import { mockStore } from './utilites'

jest.mock('react-native-app-auth')

const initialState = {
  user: null,
  signingIn: false,
  signinError: null,
}

const filledState = {
  user: {},
  signingIn: {},
  signinError: {},
}

describe('steem', () => {
  describe('reducer', () => {
    it('should return the default state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should have the current user in the default state if available', () => {
      const userSettings = {
        accessTokenExpirationDate: moment()
          .add(8, 'days')
          .format(),
        idToken: 'id token',
        userName: 'my name',
        accessToken: 'access token',
        tokenType: 'token type',
        refreshToken: 'refresh token',
      }
      database.setUser(userSettings)

      expect(reducer(undefined, {})).toEqual({
        ...initialState,
        user: {
          id: 1,
          ...userSettings,
        },
      })
    })

    it('should handle pending login', () => {
      expect(
        reducer(filledState, {
          type: going(types.SIGN_IN),
        })
      ).toEqual({
        ...filledState,
        signingIn: true,
        user: null,
        signinError: null,
      })
    })

    it('should handle resolved login', () => {
      const payload = {
        username: 'username',
        additionalStuff: 'additional stuff',
      }

      expect(
        reducer(filledState, {
          type: resolve(types.SIGN_IN),
          payload,
        })
      ).toEqual({
        ...filledState,
        signinError: null,
        signingIn: false,
        user: payload,
      })
    })

    it('should handle rejected login', () => {
      const payload = {
        error: {
          message: 'done messed up',
        },
      }

      expect(
        reducer(filledState, {
          type: reject(types.SIGN_IN),
          payload,
        })
      ).toEqual({
        ...filledState,
        signingIn: false,
        signinError: payload,
        user: null,
      })
    })
  })

  describe('action creators', () => {
    describe('login', () => {
      it('should return an action with promise on resolve', () => {
        const payload = {
          username: 'username',
          additionalStuff: 'additional stuff',
        }

        authorize.mockResolvedValueOnce(payload)

        const store = mockStore({ steem: initialState })
        const expectedActions = [
          {
            type: going(types.SIGN_IN),
          },
          {
            type: resolve(types.SIGN_IN),
            payload,
          },
        ]

        return store.dispatch(login()).then(action => {
          action.payload.promise.then(() => {
            expect(store.getActions()).toEqual(expectedActions)
          })
        })
      })

      it('should return an action with promise on reject', () => {
        authorize.mockRejectedValueOnce(new Error('Oopsy'))

        const store = mockStore({ steem: initialState })
        const expectedActions = [
          {
            type: going(types.SIGN_IN),
          },
          {
            type: reject(types.SIGN_IN),
            error: true,
            payload: new Error('Oopsy'),
          },
        ]

        return store.dispatch(login()).then(action => {
          action.payload.promise.catch(() => {
            expect(store.getActions()).toEqual(expectedActions)
          })
        })
      })
    })
  })
})
