import { PENDING, FULFILLED, REJECTED } from "redux-promise-middleware"

export function pending(type: string) {
  return `${type}${PENDING}`
}

export function resolve(type: string) {
  return `${type}${FULFILLED}`
}

export function reject(type: string) {
  return `${type}${REJECTED}`
}
