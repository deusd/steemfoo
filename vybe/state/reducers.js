import { combineReducers } from "redux"
import device from "./device"
import firebase from "./firebase"

const initialState = {}

export default combineReducers({ device, firebase })
