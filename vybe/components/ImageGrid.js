//@flow

import React from "react"
import { FlatList, Image, Dimensions, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { ImageType } from "../types"

let size

export default class ImageGrid extends React.Component<{
  images: ImageType[],
  imagesAcross: number,
  imageSize: number,
}> {
  renderImage = ({ item, key }, index) => {
    console.log(item)
    const { uri } = item
    const { imageSize: size, imagesAcross } = this.props

    const customStyles = StyleSheet.create({
      image: {
        resizeMode: Image.resizeMode.cover,
        borderWidth: 1,
        borderColor: "white",
        width: size,
        height: size,
      },
    })

    return <Image key={key} source={{ uri }} style={customStyles.image} />
  }

  render() {
    const { images, imagesAcross, imageSize } = this.props
    const hasImages = images && images.length > 0

    // update image size for styling
    size = imageSize

    return hasImages ? (
      <FlatList
        numColumns={imagesAcross}
        data={images}
        renderItem={this.renderImage}
        keyExtractor={image => image.uri}
        style={styles.grid}
      />
    ) : null
  }
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
  },
})
