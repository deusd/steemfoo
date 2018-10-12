import { createAction } from 'redux-action'
import { cloneDeep } from 'lodash'
import { FIREBASE_UPLOAD_IMAGE, FIREBASE_DOWNLOAD_IMAGE } from '../types'
// import { uploadPostImage } from '../../utilities/image'
import { pending, resolve, reject } from '../../utilities/reducer'

export const uploadImage = createAction(
  FIREBASE_UPLOAD_IMAGE,
  (base64: string) => {
    if (!base64) {
      throw 'You must provide the base64 for the image!!!'
    }

    return {
      base64,
      // promise: uploadPostImage(base64),
    }
  }
)

const initialState = { uploadingImage: false }
export default (state = initialState, action) => {
  let newState = cloneDeep(state)
  switch (action.type) {
    case pending(FIREBASE_UPLOAD_IMAGE): // eslint-disable-line jest/no-disabled-tests
      newState = { ...newState, uploadingImage: true }
      break
    case resolve(FIREBASE_UPLOAD_IMAGE):
      newState = { ...newState, uploadingImage: false, data: action.payload }
      break
    case reject(FIREBASE_UPLOAD_IMAGE):
      newState = { ...newState, uploadingImage: false, error: action.payload }
      break
    case FIREBASE_DOWNLOAD_IMAGE:
      break
    default:
      break
  }
  return newState
}
