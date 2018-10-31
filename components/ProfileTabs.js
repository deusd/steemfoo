//@flow

import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

type Props = {
  onTabSelected: Function,
}

class ProfileTabs extends React.Component<Props> {
  state = {
    currentButton: 'Blog',
  }

  renderButton(text) {
    return (
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => {
          this.setState({ currentButton: text })
          if (this.props.onTabSelected) {
            this.props.onTabSelected(text)
          }
        }}
        testID={`${text}Button`}
      >
        <Text
          style={[
            styles.viewButtonText,
            this.state.currentButton === text && styles.viewButtonTextActive,
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {this.renderButton('Blog')}
        {this.renderButton('Comments')}
        {this.renderButton('Replies')}
        {this.renderButton('Wallet')}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewButton: {
    padding: 5,
  },
  viewButtonText: {
    textAlign: 'center',
    backgroundColor: 'white',
    color: '#00A3FF',
    padding: 10,
    paddingHorizontal: 15,
    borderColor: '#3BB8FF',
    borderWidth: 1,
  },
  viewButtonTextActive: {
    backgroundColor: '#3BB8FF',
    opacity: 0.6,
    color: 'white',
    fontWeight: 'bold',
  },
})

export default ProfileTabs
