import firebase from "firebase"
import { convertToByteArray } from "./blob"

const uploadAsByteArray = (
  base64: string,
  rootDir: string,
  imageName: string
) =>
  new Promise((resolve, reject) => {
    const pickerResultAsByteArray = convertToByteArray(base64)
    const metadata = {
      contentType: "image/jpeg",
    }
    const storageRef = firebase.storage().ref()
    const imagePath = `images/${rootDir}/${imageName}.jpg`
    const ref = storageRef.child(imagePath)
    let uploadTask = ref.put(pickerResultAsByteArray, metadata)

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100
        console.log(imagePath, progress)
      },
      error => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            reject("Upload denied, check that you are still signed in")
            break
          case "storage/canceled":
            // User canceled the upload, nothing to do here
            break
          default:
            reject("There was an uploading your image")
            console.error(error)
            break
        }
      },
      () => {
        const downloadURL = uploadTask.snapshot.downloadURL
        resolve({ imagePath, downloadURL })
      }
    )
  })

export const uploadPostImage = (base64: string) => {
  // const { uid } = firebase.auth().currentUser
  return uploadAsByteArray(base64, "testing", "12345")
}
