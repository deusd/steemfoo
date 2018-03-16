import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

class Row extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired(),
    style: PropTypes.object,
  }

  static defaultProps = {
    style: {},
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', ...this.props.style }}>
        {this.props.children}
      </View>
    )
  }
}

export default Row
