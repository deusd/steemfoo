import React from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import Row from './layouts/Row'

const Loading = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Row>
      <Text style={{ marginRight: 10 }}>Loading posts</Text>
      <ActivityIndicator />
    </Row>
  </View>
)

export default Loading
