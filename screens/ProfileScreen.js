// @flow
// @format

import React from 'react'
import { Alert, Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import Image from 'react-native-image-progress'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageContainer from '../components/PageContainer'
import Logo from '../components/Logo'
import LoginScreen from '../screens/LoginScreen'

type ProfileProps = {
  user: Object,
}

type Props = {
  login: Function,
  error: Object,
  user: Object,
}

class Profile extends React.Component<ProfileProps> {
  render() {
    return (
      <PageContainer style={styles.profilePage}>
        <Image
          style={styles.profileBackgroundImage}
          resizeMode={'cover'}
          source={{
            uri:
              'https://ak8.picdn.net/shutterstock/videos/32852968/thumb/1.jpg',
          }}
        />
        <View style={styles.userInfoRow}>
          <View style={styles.innerPageContainer}>
            <Image
              style={styles.profileImage}
              resizeMode={'cover'}
              borderRadius={6}
              source={{
                uri:
                  'https://pickaface.net/gallery/avatar/20160616_021428_4100_Nerd.png',
              }}
            />
            <Text style={styles.priceText}>$1,809.25</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>@cryptobills</Text>
            <Text style={styles.userDescription}>
              Bay area resider looking to learn more about crypto and build
              awesome apps on the steem blockchain!
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}
        >
          <Text>2093 followers</Text>
          <Text>202 following</Text>
          <Text>298 posts</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}
        >
          <Text>Joined May 27</Text>
          <Text>#pixelartweekly #hotsorshots</Text>
          <Text>steem.shop</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>Blog</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>Comments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>Replies</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>Wallet</Text>
          </TouchableOpacity>
        </View>
      </PageContainer>
    )
  }
}

export class ProfileTab extends React.Component<Props> {
  static propTypes = {
    error: PropTypes.any,
    user: PropTypes.any,
  }

  renderLogin() {
    return <LoginScreen />
  }

  renderProfile() {
    return <Profile user={this.props.user} />
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
  viewButton: {
    padding: 10,
  },
  viewButtonText: {
    textAlign: 'center',
    backgroundColor: '#89D4FF',
    color: 'white',
    padding: 10,
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  userName: {
    fontWeight: 'bold',
  },
  userDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  userInfoRow: {
    flexDirection: 'row',
    flex: 1,
  },
  innerPageContainer: {
    padding: 20,
    marginTop: -80,
  },
  profileBackgroundImage: {
    width: '100%',
    aspectRatio: 3.25,
  },
  profileImage: {
    width: 120,
    height: 132,
  },
  profilePage: {
    paddingTop: 80,
  },
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
}))(ProfileTab)
