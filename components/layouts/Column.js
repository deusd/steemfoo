import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

class Columns extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired(),
    style: PropTypes.object,
  }

  static defaultProps = {
    style: {},
  }

  render() {
    return (
      <View style={{ flexDirection: 'column', ...this.props.style }}>
        {this.props.children}
      </View>
    )
  }
}

export default Columns
