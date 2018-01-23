import { AsyncStore } from "react-native"
import { createStore, applyMiddleware, combineReducers, compose } from "redux"
import { createLogger } from "redux-logger"
import thunkMiddleware from "redux-thunk"
import promiseMiddleware from "redux-simple-promise"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import reducer from "./reducers"

const loggerMiddleware = createLogger()

const middlewares = [thunkMiddleware, promiseMiddleware]
if (__DEV__) {
  middlewares = [...middlewares, loggerMiddleware]
}

const composeEnhancer = composeWithDevTools({})

function configureStore(initialState) {
  const enhancer = composeEnhancer(
    applyMiddleware(loggerMiddleware, promiseMiddleware)
  )

  return createStore(reducer, initialState, enhancer)
}

const store = configureStore({})

export default store
