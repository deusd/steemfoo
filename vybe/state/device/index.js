//@flow
import { CameraRoll } from "react-native"
import { cloneDeep } from "lodash"
import { createAction } from "redux-action"
import { LOAD_CAMERA_ROLL_IMAGES, SAVE_TO_CAMERA_ROLL } from "../types"

export const loadCameraRollImages = createAction(
  LOAD_CAMERA_ROLL_IMAGES,
  (cursor: string) => {
    return CameraRoll.getPhotos({
      first: 20,
    })
  }
)

initialState = {}
export default (state = initialState, action) => {
  newState = cloneDeep(state)
  console.log("random action?!?!?!", action)

  switch (action.type) {
    case LOAD_CAMERA_ROLL_IMAGES:
      newState = { ...newState, loadingImages: false }
      console.log("got action", action)
      break
    case SAVE_TO_CAMERA_ROLL:
      break
    default:
      break
  }

  return newState
}
