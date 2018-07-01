import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

const Logo = props => {
  return <Text style={[styles.logo, props.style]}>Vybe</Text>
}

Logo.propTypes = {
  style: PropTypes.any,
}

const styles = {
  logo: {
    fontFamily: 'MarckScript-Regular',
    color: 'white',
    fontSize: 72,
  },
}
