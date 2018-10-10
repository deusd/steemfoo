import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import Config from 'react-native-config'
import firebase from 'firebase'
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const loggerMiddleware = createLogger()

let middlewares = [thunkMiddleware, promiseMiddleware()]

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

const composeEnhancers = composeWithDevTools({})

function configureStore() {
  const enhancer = composeEnhancers(applyMiddleware(...middlewares))

  return createStore(persistedReducer, enhancer)
}

export const store = configureStore()
export const persistor = persistStore(store)

export default store
