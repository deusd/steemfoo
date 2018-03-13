import React from 'react'

import { Dimensions } from 'react-native'

import { connect } from 'react-redux'
import { get } from 'lodash'
// import ImageGrid from '../components/ImageGrid'
import { loadCameraRollImages } from '../state/device'
import { uploadImage } from '../state/firebase'

class PickImageScreen extends React.Component {
  state = {
    selectedImage: 0,
  }

  componentDidMount() {
    // this.loadCameraRollPhotos()
    this.props.loadCameraRollImages()
  }

  renderLoading() {
    return <ActivityIndicator size="large" />
  }

  get mainImage(): string {
    const { selectedImage } = this.state
    const image = get(this.props, `images[${selectedImage}].uri`)
    return image
  }

  renderImages() {
    const { width } = Dimensions.get('window')
    const size = width / 5
    // const { image } = this.props
    // const { selectedImage } = this.state

    return (
      <React.Fragment>
        <Image
          source={{ uri: this.mainImage }}
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

  uploadImage = () => {
    this.props.uploadImage(this.mainImage)
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
          {this.props.loadingImages
            ? this.renderLoading()
            : this.renderImages()}
          <Button full onPress={this.uploadImage}>
            <Text>Upload image</Text>
          </Button>
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
  return { loadingImages, images, firebase: state.firebase }
}
const mapDispatchToProps = {
  loadCameraRollImages,
  uploadImage,
}

export default connect(mapStateToProps, mapDispatchToProps)(PickImageScreen)
