import React from "react"
import { ExpoConfigView } from "@expo/samples"
import { Container, Card, Content, CardItem, Text, Button } from "native-base"
import { ImagePicker } from "expo"
import { observable } from "mobx"
import { observer } from "mobx-react/native"
import { Image, Dimensions } from "react-native"
import firebase from "firebase"

@observer
export default class CameraScreen extends React.Component {
  @observable image = {}
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
    result = await ImagePicker.launchImageLibraryAsync(this.imageOptions)

    console.log(result)

    if (!result.cancelled) {
      this.image = result
    }
  }

  submitImage = async () => {
    this.submitting = true
    const ref = firebase.storage().ref()

    try {
      await ref.putString(this.image.base64, "base64")
    } catch (e) {
      console.log(e)
    }

    this.submitting = false
  }

  render() {
    const { image: { uri: image }, deviceWidth, submitImage, submitting } = this

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
