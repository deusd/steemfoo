import { createAction } from "redux-action"
import { resolve, reject } from "redux-simple-promise"
import { cloneDeep } from "lodash"
import firebase from "firebase"
import RNFetchBlob from "react-native-fetch-blob"
import { FIREBASE_UPLOAD_IMAGE, FIREBASE_DOWNLOAD_IMAGE } from "../types"

const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const sendImageToFirebase = async (filePath: string) => {
  // create Blob from file path
  console.log("uploadImage", "building blog")
  const blob = await Blob.build(rnfbURI, { type: "image/jpg;" })
  console.log("uploadImage", "sending to firebase")
  const snapshot = await firebase
    .storage()
    .ref("test-firebase-upload")
    .child("testimage.jpg")
    .put(blob, { contentType: "image/jpg" })
  console.log("uploadImage", "done sending to firebase", snapshot)

  return snapshot
}

export const uploadImage = createAction(
  FIREBASE_UPLOAD_IMAGE,
  (filePath: string) => {
    let rnfbURI = RNFetchBlob.wrap(filePath)

    return { filePath, promise: sendImageToFirebase(rnfbURI) }
  }
)

const initialState = {}
export default (state = initialState, action) => {
  let newState = cloneDeep(state)
  switch (action.type) {
    case FIREBASE_UPLOAD_IMAGE:
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
