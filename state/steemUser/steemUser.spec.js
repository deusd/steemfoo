import * as RNA from 'react-native-app-auth'
import { REHYDRATE } from 'redux-persist'
import reducer, { login } from './index'
import { pending as going, resolve, reject } from '../../utilities/reducer'
import * as types from '../types'
import { mockStore } from '../test/utilites'
import moment from 'moment'

jest.mock('react-native-app-auth')
let initialState
let filledState

describe('steemUser', () => {
  beforeEach(() => {
    jest.spyOn(RNA, 'authorize')
    initialState = {
      user: undefined,
      signingIn: false,
      signinError: undefined,
    }

    filledState = {
      user: {},
      signingIn: false,
      signinError: {},
    }
  })

  describe('reducer', () => {
    it('should return the default state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should remove the stored user if the user token has expired', () => {
      filledState.user.accessTokenExpirationDate = moment().subtract(
        '5',
        'days'
      )
      const newState = reducer(undefined, {
        type: REHYDRATE,
        payload: {
          steemUser: filledState,
        },
      })
      expect(newState.user).toBe(undefined)
    })

    it('should handle pending login', () => {
      expect(
        reducer(filledState, {
          type: going(types.SIGN_IN),
        })
      ).toEqual({
        ...filledState,
        signingIn: true,
        user: undefined,
        signinError: undefined,
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
        signinError: undefined,
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
        user: undefined,
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

        RNA.authorize.mockResolvedValueOnce(payload)

        const store = mockStore({ steemUser: initialState })
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
        RNA.authorize.mockRejectedValueOnce(new Error('Oopsy'))

        const store = mockStore({ steemUser: initialState })
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
