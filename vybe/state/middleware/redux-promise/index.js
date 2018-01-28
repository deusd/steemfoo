import { isFSA } from "flux-standard-action"

function isPromise(val) {
  return val && typeof val.then === "function"
}

export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    console.log("in promise middleware!!!", action)
    if (!isFSA(action)) {
      console.log("damn, not an fsa", action)
      return isPromise(action) ? action.then(dispatch) : next(action)
    }
    console.log("welp its an fsa", action)

    if (isPromise(action.payload)) {
      console.log("found a promise", action)
      // let em know that we are loading
      dispatch({ ...action, pending: true })

      // return the promise
      return action.payload.then(
        result => dispatch({ ...action, payload: result }),
        error => {
          dispatch({ ...action, payload: error, error: true })
          return Promise.reject(error)
        }
      )
    }

    return next(action)
  }
}
