import { AsyncStore } from "react-native"
import { createStore, applyMiddleware, combineReducers } from "redux"
import { createLogger } from "redux-logger"
import thunkMiddleware from "redux-thunk"
import promiseMiddleware from "redux-promise-middleware"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import Config from "react-native-config"
import firebase from "firebase"
import reducer from "./reducers"

const loggerMiddleware = createLogger()

const middlewares = [thunkMiddleware, promiseMiddleware()]
if (__DEV__) {
  middlewares = [...middlewares, loggerMiddleware]
}

// Initialize Firebase
var config = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  databaseURL: Config.FIREBASE_DATABASE_URL,
  projectId: Config.FIREBASE_PRODUCT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
}

firebase.initializeApp(config)

const composeEnhancer = composeWithDevTools({})

function configureStore(initialState) {
  const enhancer = composeEnhancer(applyMiddleware(...middlewares))

  return createStore(reducer, enhancer)
}

const store = configureStore({})

export default store
