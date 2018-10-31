// @flow
// @format

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Image from 'react-native-image-progress'
import { connect } from 'react-redux'
import PageContainer from '../components/PageContainer'
import PostsContent from '../components/PostsContent'
import LoginScreen from '../screens/LoginScreen'
import ApolloWrapper from '../components/ApolloWrapper'
import ProfileTabs from '../components/ProfileTabs'

type ProfileProps = {
  user: Object,
  navigation: Object,
}

type Props = {
  login: Function,
  error: Object,
  user: Object,
  navigation: Object,
}

class Profile extends React.Component<ProfileProps> {
  state = { currentTab: 'Blog' }

  renderTab() {
    switch (this.state.currentTab) {
      case 'Blog':
        return (
          <PostsContent
            navigation={this.props.navigation}
            postType="BLOG"
            tag="cryptobills"
            author="cryptobills"
          />
        )
      case 'Comments':
        return null
      case 'Replies':
        return null
      case 'Wallet':
        return null
      default:
        return null
    }
  }

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
        <ProfileTabs
          onTabSelected={currentTab => {
            this.setState({ currentTab })
          }}
        />

        {this.renderTab()}
      </PageContainer>
    )
  }
}

export class ProfileScreen extends React.Component<Props> {
  renderLogin() {
    return <LoginScreen />
  }

  renderProfile() {
    return <Profile navigation={this.props.navigation} user={this.props.user} />
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
  profilePage: {},
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
}))(ApolloWrapper(ProfileScreen))
