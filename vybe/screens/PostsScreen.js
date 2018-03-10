/* eslint-disable */
import React from 'react'

import {
  Platform,
  StyleSheet,
  Alert,
  CameraRoll,
  ActivityIndicator,
  Dimensions,
  Image,
  View
} from 'react-native'
import {
  ActionSheet,
  Container,
  Header,
  Body,
  Title,
  Button,
  Content,
  Text,
  Footer,
  FooterTab,
  Icon,
} from 'native-base'
import { connect } from 'react-redux'
import { getPosts } from "../state/steem";

class PostsScreen extends React.Component {
  componentDidMount()  {
    this.props.getPosts("latest", { tag: "steepshot", limit: 20 });
  }

  showLoadingPosts() {
      return (<React.Fragment><Text>Loading posts<ActivityIndicator/></Text></React.Fragment>);
  }

  showPosts() {
    return <Text>{this.props.posts.toString()}</Text>
  }

  render() {
    const {
      isLoadingPosts,
      posts
    } = this.props

    return (
      <Container>
        <Header>
          <Body>
            <Title>VYBE</Title>
          </Body>
        </Header>
        <Content>
          <Body>
            {isLoadingPosts ? this.showLoadingPosts() : this.showPosts()}
          </Body>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = ({steem}) => ({
  ...steem
})
const mapDispatchToProps = {
  getPosts
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsScreen)
