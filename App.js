/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import SplashScreen from 'react-native-splash-screen'
import RootStack from './components/RootStack'

class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return <RootStack />
  }
}

export default App
