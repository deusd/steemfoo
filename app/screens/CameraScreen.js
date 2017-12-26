import React from "react"
import { ExpoConfigView } from "@expo/samples"
import { Container, Card, Content, CardItem, Text, Button } from "native-base"
import { ImagePicker } from "expo"
import { observable } from "mobx"
import { observer } from "mobx-react/native"
import { Image, Dimensions } from "react-native"

@observer
export default class CameraScreen extends React.Component {
  @observable image
  imageOptions = {
    mediaTypes: "Images",
  }
  deviceWidth = Dimensions.get("window").width

  static navigationOptions = {
    title: "Camera View",
  }

  getImage = async () => {
    result = await ImagePicker.launchImageLibraryAsync(this.imageOptions)

    console.log(result)

    if (!result.cancelled) {
      this.image = result.uri
    }
  }

  render() {
    const { image, deviceWidth } = this

    return (
      <Container>
        <Content>
          {this.image && (
            <Image
              source={{ uri: image }}
              style={{ width: deviceWidth, height: deviceWidth }}
              resizeMode="contain"
            />
          )}
          <Button block onPress={this.getImage}>
            <Text>Load from gallery</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}
