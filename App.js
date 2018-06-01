/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'
import RootStack from './components/RootStack'
import LoginScreen from './screens/LoginScreen'
import store from './state/store'

class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return (
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    )
  }
}

export default App
