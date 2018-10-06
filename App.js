/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
 */

import React from 'react'
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'
import RootStack from './components/RootStack'
import store from './state/store'

type Props = {}
class App extends React.Component<Props> {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    )
  }
}

export default App
