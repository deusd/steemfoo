import React from 'react'
import { Alert, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageContainer from '../components/PageContainer'
import Logo from '../components/Logo'
import { login } from '../state/steem'

export class LoginScreen extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  }

  render() {
    if (this.props.error) {
      Alert.alert('Oopsy', 'There was an error signing in, please try again')
    }

    return (
      <PageContainer style={styles.page}>
        <Logo style={styles.logo} />
        <Text style={styles.text}>
          All account operations are handled securely through steemconnect
        </Text>
        <Text style={styles.smallText}>
          We never store your passwords or private keys locally
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this.props.login}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </PageContainer>
    )
  }
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#3BB8FF',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    color: 'white',
    textAlign: 'center',
    marginTop: 30,
  },
  smallText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  logo: {
    marginTop: 120,
    alignSelf: 'center',
  },
  button: {
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 5,
    marginTop: 40,
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
})

export default connect(
  ({ steem }) => ({
    user: steem.user,
    error: steem.signinError,
  }),
  { login }
)(LoginScreen)
