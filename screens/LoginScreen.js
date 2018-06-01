import React from 'react'
import { Button, Alert } from 'react-native'
import PageContainer from '../components/PageContainer'
import { connect } from 'react-redux'
import { login } from '../state/steem'

export class LoginScreen extends React.Component {
  render() {
    return (
      <PageContainer>
        <Button
          title="Login"
          onPress={this.props.login}
          style={{ marginTop: 60 }}
        />
      </PageContainer>
    )
  }
}

export default connect(
  ({ steem }) => ({
    user: steem.user,
  }),
  { login }
)(LoginScreen)
