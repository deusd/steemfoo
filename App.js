/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'

import { Provider } from 'react-redux'
import store from './state/store'
import PostsScreen from './screens/PostsScreen'

// disable annoying yellow box warnings
console.disableYellowBox = true  // eslint-disable-line

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        {/* <PickImageScreen /> */}
        <PostsScreen />
      </Provider>
    )
  }
}
