import { StackNavigator } from 'react-navigation'
import PostsScreen from '../screens/PostsScreen'
import RepliesScreen from '../screens/RepliesScreen'

const RootStack = StackNavigator(
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

export default RootStack