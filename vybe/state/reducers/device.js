// reducers for dealing with device apis
import { cloneDeep } from "lodash"
import { LOAD_CAMERA_ROLL_IMAGES_REQUEST, SAVE_TO_CAMERA_ROLL } from "../types"

initialState = {}

export default (state = initialState, action) => {
  newState = cloneDeep(state)

  switch (action.type) {
    case LOAD_CAMERA_ROLL_IMAGES_REQUEST:
      break
    case SAVE_TO_CAMERA_ROLL:
      break
    default:
      break
  }

  return newState
}
