import React from "react"

import {
  Platform,
  StyleSheet,
  Alert,
  CameraRoll,
  ActivityIndicator,
  Dimensions,
  Image,
  View,
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

import { connect } from "react-redux"
import * as _ from "lodash"
import ImageGrid from "../components/ImageGrid"
import { loadCameraRollImages } from "../state/device"

class PickImageScreen extends React.Component {
  state = {
    images: [],
  }

  componentDidMount() {
    // this.loadCameraRollPhotos()
    this.props.loadCameraRollImages()
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

  renderLoading() {
    return <ActivityIndicator size="large" />
  }

  renderImages() {
    const { width, height } = Dimensions.get("window")
    const size = width / 5

    return (
      <React.Fragment>
        <Image
          source={{ uri: _.get(this.state, "images[0].uri") }}
          style={{ width: width, height: width }}
        />
        <ImageGrid
          images={this.state.images}
          imagesAcross={5}
          imageSize={size}
        />
      </React.Fragment>
    )
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>VYBE</Title>
          </Body>
        </Header>
        <Content>
          {/* <Text>Got some text here</Text> */}
          {this.state.loadingImages
            ? this.renderLoading()
            : this.renderImages()}
        </Content>
        <Footer>
          <FooterTab>
            <Button>
              <Icon name="camera" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { loadingImages, images } = state.device
  return { loadingImages, images }
}
const mapDispatchToProps = {
  loadCameraRollImages,
}

export default connect(mapStateToProps, mapDispatchToProps)(PickImageScreen)
