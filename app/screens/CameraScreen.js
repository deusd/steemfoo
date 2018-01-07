import React from "react"
import { ExpoConfigView } from "@expo/samples"
import { Container, Card, Content, CardItem, Text, Button } from "native-base"
import { ImagePicker } from "expo"
import { observable, runInAction } from "mobx"
import { observer } from "mobx-react/native"
import { Image, Dimensions } from "react-native"
import firebase from "firebase"
import convertToByteArray from "../utils/convertToByteArray"

@observer
export default class CameraScreen extends React.Component {
  @observable image
  @observable firebaseImage
  @observable submitting = false

  imageOptions = {
    mediaTypes: "Images",
    base64: true,
  }
  deviceWidth = Dimensions.get("window").width

  static navigationOptions = {
    title: "Camera View",
  }

  getImage = async () => {
    console.log("getting image")
    result = await ImagePicker.launchImageLibraryAsync(this.imageOptions)

    if (!result.cancelled) {
      console.log("got image", result)

      runInAction(() => {
        this.image = result.uri
        this.firebaseImage = convertToByteArray(result.base64)
        console.log("image uri", this.image.uri)
        console.log("firebase image", this.firebaseImage)
      })
      // console.log(result.base64)
    }
  }

  submitImage = async () => {
    this.submitting = true

    const ref = firebase
      .storage()
      .ref()
      .child("images/test.jpg")
    const metadata = {
      contentType: "image/jpeg",
    }

    try {
      const returnVal = await ref.put(this.firebaseImage, metadata)
      console.log("success!!!", returnVal)
    } catch (e) {
      console.log("failure", e)
    }

    this.submitting = false
  }

  render() {
    const { image, deviceWidth, submitImage, submitting } = this

    return (
      <Container>
        <Content>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: deviceWidth, height: deviceWidth }}
              resizeMode="contain"
            />
          )}
          <Button block onPress={this.getImage}>
            <Text>Load from gallery</Text>
          </Button>
          {image && (
            <Button block onPress={this.submitImage}>
              <Text>{submitting ? "Submitting..." : "Submit to server"}</Text>
            </Button>
          )}
        </Content>
      </Container>
    )
  }
}
