/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react"
import {
  Platform,
  StyleSheet,
  Alert,
  CameraRoll,
  ActivityIndicator,
} from "react-native"
import {
  ActionSheet,
  Container,
  Header,
  Body,
  Title,
  Button,
  Content,
  Text,
  Footer,
  FooterTab,
  Icon,
} from "native-base"

import { Provider } from "react-redux"
import store from "./state/store"
import * as _ from "lodash"
import ImageGrid from "./components/ImageGrid"

const options = ["Cancel", "Apple", "Banana", "Watermelon", "Durian"]
const title = "Load an image or take a picture?"

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
})

export default class App extends Component<{}> {
  state = {
    images: [],
  }

  componentDidMount() {
    this.loadCameraRollPhotos()
  }

  loadCameraRollPhotos(cursor, next) {
    this.setState({ loadingImages: true })
    CameraRoll.getPhotos({ first: 20 })
      .then(result => {
        newImages = []
        result.edges.map(e => {
          if (e.node && e.node.image) {
            const {
              image: { filename, height, uri, width },
              location,
              timestamp,
            } = e.node
            newImages.push({
              filename,
              height,
              width,
              uri,
              location,
              timestamp,
            })
          }
        })

        console.log(newImages)
        this.setState({
          images: _.concat(this.state.images, newImages),
          loadingImages: false,
        })
      })
      .catch(reason => {
        console.log(reason)
        this.setState({ loadingImages: false })
      })
  }

  onLoadImage = () => {
    Alert.alert("Wow", "stuff happened yo")
  }
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Header>
            <Body>
              <Title>VYBE</Title>
              {this.state.loadingImages ? (
                <ActivityIndicator size="large" />
              ) : null}

              <ImageGrid images={this.state.images} imagesAcross={5} />
            </Body>
          </Header>
          <Content />
          <Footer>
            <FooterTab>
              <Button>
                <Icon name="camera" />
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
})
