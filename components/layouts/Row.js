import React from 'react'
import { View } from 'react-native'

type Props = {
  children: React.Node,
  style: Object | Array,
}
class Row extends React.Component<Props> {
  render() {
    return (
      <View style={[{ flexDirection: 'row' }, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

export default Row
