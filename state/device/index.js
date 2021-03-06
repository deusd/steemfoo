//@flow
import { CameraRoll } from 'react-native'
import { cloneDeep } from 'lodash'
import { createAction } from 'redux-action'
import { pending, resolve, reject } from '../../utilities/reducer'
import { LOAD_CAMERA_ROLL_IMAGES, SAVE_TO_CAMERA_ROLL } from '../types'

export const loadCameraRollImages = createAction(
  LOAD_CAMERA_ROLL_IMAGES,
  () => ({
    promise: CameraRoll.getPhotos({
      first: 20,
    }),
  })
)

const initialState = {}
export default (state = initialState, action) => {
  let newState = cloneDeep(state)
  let images
  newState.error = undefined

  switch (action.type) {
    case pending(LOAD_CAMERA_ROLL_IMAGES): // eslint-disable-line jest/no-disabled-tests
      newState = { ...newState, loadingImages: true }
      break
    case resolve(LOAD_CAMERA_ROLL_IMAGES):
      images = action.payload.edges.map(edge => {
        if (edge.node && edge.node.image) {
          const {
            image: { filename, height, uri, width },
            location,
            timestamp,
          } = edge.node
          return { filename, height, width, uri, location, timestamp }
        }
      })
      newState = { ...newState, images, loadingImages: false }
      break
    case reject(LOAD_CAMERA_ROLL_IMAGES):
      newState = { ...newState, loadingImages: false, error: action.payload }
      break
    case SAVE_TO_CAMERA_ROLL:
      break
    default:
      break
  }

  return newState
}
