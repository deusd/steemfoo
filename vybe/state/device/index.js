//@flow
import { CameraRoll } from "react-native"
import { cloneDeep } from "lodash"
import { LOAD_CAMERA_ROLL_IMAGES_REQUEST, SAVE_TO_CAMERA_ROLL } from "../types"
import { resolve, reject } from "redux-simple-promise"

export function loadCameraRollImages(cursor: string) {
  return {
    type: LOAD_CAMERA_ROLL_IMAGES_REQUEST,
    payload: {
      promise: CameraRoll.getPhotos({
        first: 20,
      }),
    },
  }
}

initialState = {}
export default (state = initialState, action) => {
  newState = cloneDeep(state)

  switch (action.type) {
    case LOAD_CAMERA_ROLL_IMAGES_REQUEST:
      newState = { ...newState, loadingImages: true }
      break
    case resolve(LOAD_CAMERA_ROLL_IMAGES_REQUEST):
      newState = { ...newState, loadingImages: false }
      break
    case reject(LOAD_CAMERA_ROLL_IMAGES_REQUEST):
      newState = { ...newState, loadingImages: false }
      break
    case SAVE_TO_CAMERA_ROLL:
      break
    default:
      break
  }

  return newState
}
