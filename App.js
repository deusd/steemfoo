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
import store, { persistor } from './state/store'
import { PersistGate } from 'redux-persist/es/integration/react'
import { YellowBox } from 'react-native'

type Props = {}

YellowBox.ignoreWarnings(['Remote debugger'])

class App extends React.Component<Props> {
  onStateRestored() {
    SplashScreen.hide()
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} onBeforeLift={this.onStateRestored}>
          <RootStack />
        </PersistGate>
      </Provider>
    )
  }
}

export default App
