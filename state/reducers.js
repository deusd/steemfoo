import { combineReducers } from 'redux'
import device from './device'
import firebase from './firebase'
import steem from './steem'

export default combineReducers({ device, firebase, steem })
