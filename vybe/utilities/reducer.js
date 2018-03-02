import { PENDING, FULFILLED, REJECTED } from "redux-promise-middleware"

export function pending(type: string) {
  return `${type}_${PENDING}`
}

export function resolve(type: string) {
  return `${type}_${FULFILLED}`
}

export function reject(type: string) {
  return `${type}_${REJECTED}`
}
