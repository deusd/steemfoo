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
    selectedImage: 0,
  }

  componentDidMount() {
    // this.loadCameraRollPhotos()
    this.props.loadCameraRollImages()
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
    const { image } = this.props
    const { selectedImage } = this.state
    console.log("we are on image", selectedImage)

    return (
      <React.Fragment>
        <Image
          source={{ uri: _.get(this.props, `images[${selectedImage}].uri`) }}
          style={{ width: width, height: width }}
        />
        <ImageGrid
          images={this.props.images}
          imagesAcross={5}
          imageSize={size}
          onImageSelected={selectedImage => this.setState({ selectedImage })}
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
          {this.props.loadingImages
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
