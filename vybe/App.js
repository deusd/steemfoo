/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react"
import { Platform } from "react-native"

import { Provider } from "react-redux"
import store from "./state/store"
import PickImageScreen from "./screens/PickImageScreen"

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <PickImageScreen />
      </Provider>
    )
  }
}
