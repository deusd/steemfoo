import React from 'react'
import { Text } from 'react-native'

export default props => {
  return <Text style={[styles.logo, props.style]}>Vybe</Text>
}

const styles = {
  logo: {
    fontFamily: 'MarckScript-Regular',
    color: 'white',
    fontSize: 72,
  },
}
