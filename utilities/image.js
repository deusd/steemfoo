import firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'
import { convertToByteArray } from './blob'

const uploadAsByteArray = (
  imagePath: string,
  rootDir: string,
  imageName: string
) =>
  new Promise((resolve, reject) => {
    // use RNFB to convert asset path to byte array
    RNFetchBlob.fs.readFile(imagePath, 'base64').then(data => {
      // convert base64 to bytearray and send to firebase
      const pickerResultAsByteArray = convertToByteArray(data)
      const metadata = { contentType: 'image/jpeg' }
      const storageRef = firebase.storage().ref()
      const imagePath = `images/${rootDir}/${imageName}.jpg`
      const ref = storageRef.child(imagePath)
      let uploadTask = ref.put(pickerResultAsByteArray, metadata)

      // process the upload and handle the events
      uploadTask.on(
        'state_changed',
        // snapshot => {
        // const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100
        // },
        error => {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              reject('Upload denied, check that you are still signed in')
              break
            case 'storage/canceled':
              // User canceled the upload, nothing to do here
              break
            default:
              reject('There was an uploading your image')
              break
          }
        },
        () => {
          const downloadURL = uploadTask.snapshot.downloadURL
          resolve({ imagePath, downloadURL })
        }
      )
    })
  })

export const uploadPostImage = (imagePath: string) => {
  // const { uid } = firebase.auth().currentUser
  return uploadAsByteArray(imagePath, 'testing', '12345')
}
