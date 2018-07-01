import React from 'react'
import { Text } from 'react-native'

export default props => {
  return <Text style={[styles.logo, props.style]}>Vybe</Text>
}

const styles = {
  logo: {
    fontFamily: 'MarkScript',
    color: 'white',
    fontSize: 72,
  },
}
