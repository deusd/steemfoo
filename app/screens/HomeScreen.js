// @flow

import React from "react"
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import { Container, Card, Content, CardItem } from "native-base"
import { WebBrowser } from "expo"
import steem from "steem"
import { observer } from "mobx-react/native"

import { MonoText } from "../components/StyledText"
import { observable, action } from "mobx"

@observer
export default class HomeScreen extends React.Component {
  @observable posts = []

  static navigationOptions = {
    header: null,
  }

  @action.bound
  updatePosts(newPosts) {
    newPosts.forEach(post => {
      const { body, author, category, url, title, id, ...remainingProps } = post
      this.posts.push({
        body,
        author,
        category,
        url,
        title,
        id,
      })
      console.log(post)
    })
  }

  renderPosts() {
    return this.posts.map((post, index) => (
      <Card key={post.id} style={styles.card} header>
        <CardItem>
          <Text>{post.title}</Text>
        </CardItem>
        <CardItem cardBody>
          <Text>{post.body}</Text>
        </CardItem>
      </Card>
    ))
  }

  componentDidMount() {
    console.log("test")
    // steem.api.getDiscussionsByTrending(
    //   { limit: 20, tag: "photography" },
    //   (err, result) => {
    //     if (!err) {
    //       this.updatePosts(result)
    //     } else {
    //       console.log(err)
    //     }
    //   }
    // )
  }

  render() {
    return (
      <Container>
        <Content>{this.renderPosts()}</Content>
      </Container>
    )
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      )

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      )
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      )
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    )
  }

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    )
  }
}

const styles = StyleSheet.create({
  card: {
    minHeight: 200,
    backgroundColor: "#fff",
  },
})
