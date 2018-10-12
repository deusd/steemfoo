// @flow
// @format

import React from 'react'
import { Alert, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageContainer from '../components/PageContainer'
import Logo from '../components/Logo'
import LoginScreen from '../screens/LoginScreen'

type Props = {
  login: Function,
  error: Object,
  user: Object,
}

export class ProfileScreen extends React.Component<Props> {
  static propTypes = {
    error: PropTypes.any,
    user: PropTypes.any,
  }

  renderLogin() {
    return <LoginScreen />
  }

  renderProfile() {
    return (
      <PageContainer style={styles.page}>
        <Logo style={styles.logo} />
        <Text style={styles.text}>Logged in as {this.props.user.userName}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Alert.alert(
              'Dang',
              'Logout not implemented yet, but your are definitely logged in!!!'
            )
          }
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </PageContainer>
    )
  }

  render() {
    if (this.props.user) {
      return this.renderProfile()
    } else {
      return this.renderLogin()
    }
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

export default connect(({ steemUser }) => ({
  user: steemUser.user,
}))(ProfileScreen)
