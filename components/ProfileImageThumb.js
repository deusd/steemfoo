import React from 'react'
import { Image } from 'react-native'

type Props = {
  profileImage: string,
}

const ProfileImageThumb = ({ profileImage }: Props) => (
  <Image
    style={{
      width: 50,
      aspectRatio: 1,
    }}
    resizeMode={'cover'}
    borderRadius={6}
    source={{
      uri:
        profileImage ||
        'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg',
    }}
  />
)

export default ProfileImageThumb
