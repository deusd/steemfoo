import React from 'react'
import Image from 'react-native-image-progress'
import { PROFILE_PLACEHOLDER_IMAGE } from '../constants'

type Props = {
  profileImage: string,
  style: any,
}

const ProfileImageThumb = ({ profileImage, style }: Props) => (
  <Image
    style={[
      {
        width: 50,
        aspectRatio: 1,
      },
      style,
    ]}
    resizeMode={'cover'}
    borderRadius={6}
    source={{
      uri: profileImage || PROFILE_PLACEHOLDER_IMAGE,
    }}
  />
)

export default ProfileImageThumb
