//@flow

import React from "react"
import { FlatList, Image, Dimensions } from "react-native"
import PropTypes from "prop-types"
import { ImageType } from "../types"

export default class ImageGrid extends React.Component<{
  images: ImageType[],
  imagesAcross: number,
}> {
  renderImage = size => image => {
    const { uri } = image

    return (
      <Image
        uri={image.uri}
        style={{
          width: size,
          height: size,
          resizeMode: Image.resizeMode.contain,
        }}
      />
    )
  }

  render() {
    const { width, height } = Dimensions.get("window")
    const { images, imagesAcross } = this.props
    const hasImages = images && images.length > 0
    console.log(images)
    return hasImages ? (
      <FlatList
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
        data={images}
        renderItem={this.renderImage(width / imagesAcross)}
        keyExtractor={image => image.uri}
      />
    ) : null
  }
}
