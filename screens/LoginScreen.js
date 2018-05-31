import React from 'react'
import { Button, Alert } from 'react-native'
import { authorize, refresh, revoke } from 'react-native-app-auth'
import PageContainer from '../components/PageContainer'

const config = {
  issuer: 'https://steemconnect.com/oauth2/',
  clientId: 'vybe',
  redirectUrl: 'io.wevybe.app://oauthredirect.login',
  scopes: ['offline'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://steemconnect.com/oauth2/authorize',
    tokenEndpoint: 'https://wevybe.herokuapp.com/loginWithAccessToken',
    revocationEndpoint: 'https://steemconnect.com/oauth2/token/revoke',
  },
}

class LoginScreen extends React.Component {
  doLogin = async () => {
    try {
      const authState = await authorize(config)
      console.log({ authState })
      Alert.alert('You made it in!!!')
    } catch (error) {
      console.log({ error })
      Alert.alert('Failed to login', error.message)
    }
  }

  render() {
    return (
      <PageContainer>
        <Button
          title="Login"
          onPress={this.doLogin}
          style={{ marginTop: 60 }}
        />
      </PageContainer>
    )
  }
}

export default LoginScreen
