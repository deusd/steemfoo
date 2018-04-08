import React from 'react'
import { ActivityIndicator, View, Text } from 'react-native'

const Loading = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>
      Loading posts <ActivityIndicator />
    </Text>
  </View>
)

export default Loading
