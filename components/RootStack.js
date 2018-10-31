import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'
import PostsScreen from '../screens/PostsScreen'
import RepliesScreen from '../screens/RepliesScreen'
import ProfileScreen from '../screens/ProfileScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'

const RootStack = createStackNavigator(
  {
    Posts: {
      screen: PostsScreen,
      passProps: { ...this.props },
    },
    Replies: {
      screen: RepliesScreen,
    },
  },
  {
    initialRouteName: 'Posts',
  }
)

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
    },
    Replies: {
      screen: RepliesScreen,
    },
  },
  {
    initialRouteName: 'Profile',
  }
)

export default createBottomTabNavigator(
  {
    Profile: ProfileStack,
    Home: RootStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => { // eslint-disable-line
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`
        } else if (routeName === 'Profile') {
          iconName = `ios-options${focused ? '' : '-outline'}`
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: '#3BB8FF',
      inactiveTintColor: 'gray',
    },
  }
)
