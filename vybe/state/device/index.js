//@flow
import { CameraRoll } from "react-native"
import { cloneDeep } from "lodash"
import { createAction } from "redux-action"
import { resolve, reject } from "redux-simple-promise"
import { LOAD_CAMERA_ROLL_IMAGES, SAVE_TO_CAMERA_ROLL } from "../types"

// export const loadCameraRollImages = createAction(LOAD_CAMERA_ROLL_IMAGES, {
//   promise: CameraRoll.getPhotos({
//     first: 20,
//   }),
// })

export const loadCameraRollImages = createAction(
  LOAD_CAMERA_ROLL_IMAGES,
  () => ({
    promise: CameraRoll.getPhotos({
      first: 20,
    }),
  })
)

initialState = {}
export default (state = initialState, action) => {
  console.log("my custom action", action)
  newState = cloneDeep(state)

  switch (action.type) {
    case LOAD_CAMERA_ROLL_IMAGES:
      newState = { ...newState, loadingImages: true }
      break
    case resolve(LOAD_CAMERA_ROLL_IMAGES):
      const images = action.payload.edges.map(e => {
        if (e.node && e.node.image) {
          const {
            image: { filename, height, uri, width },
            location,
            timestamp,
          } = e.node
          return {
            filename,
            height,
            width,
            uri,
            location,
            timestamp,
          }
        }
      })
      newState = { ...newState, images, loadingImages: false }
      break
    case reject(LOAD_CAMERA_ROLL_IMAGES):
      newState = { ...newState, loadingImages: false }
    case SAVE_TO_CAMERA_ROLL:
      break
    default:
      break
  }

  return newState
}
