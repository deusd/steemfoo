import { createActions } from "redux-action"
import { CameraRoll } from "react-native"

CameraRoll.getPhotos({ first: 30 })
