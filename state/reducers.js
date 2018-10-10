import { combineReducers } from 'redux'
import device from './device'
import firebase from './firebase'
import steemUser from './steemUser'

export default combineReducers({
  device,
  firebase,
  steemUser,
})
