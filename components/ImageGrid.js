//@flow

import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { ImageType } from '../types'

export default class ImageGrid extends React.Component<{
  images: ImageType[],
  imagesAcross: number,
  imageSize: number,
  onImageSelected: Function,
}> {
  state = {
    selectedIndex: 0,
  }

  imageSelected = selectedIndex => () => {
    this.setState({ selectedIndex })
    const { onImageSelected } = this.props
    if (onImageSelected) {
      onImageSelected(selectedIndex)
    }
  }

  renderImage = ({ item, index }) => {
    const { uri } = item
    const { imageSize: size } = this.props
    const { selectedIndex } = this.state

    const customStyles = StyleSheet.create({
      image: {
        resizeMode: Image.resizeMode.cover,
        borderWidth: 1,
        borderColor: 'white',
        width: size,
        height: size,
        opacity: selectedIndex == index ? 0.25 : 1,
      },
    })

    return (
      <TouchableWithoutFeedback onPress={this.imageSelected(index)}>
        <Image source={{ uri }} style={customStyles.image} />
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const { images, imagesAcross } = this.props
    const hasImages = images && images.length > 0

    return hasImages ? (
      <FlatList
        numColumns={imagesAcross}
        data={images}
        renderItem={this.renderImage}
        keyExtractor={image => image.uri}
        style={styles.grid}
        extraData={this.state.selectedIndex}
      />
    ) : null
  }
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
  },
})
