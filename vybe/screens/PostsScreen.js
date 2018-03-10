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
  View,
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
  render() {
    this.props.getPosts('latest', {tag: 'steepshot', limit: 20})

    return (
      <Container>
        <Header>
          <Body>
            <Title>VYBE</Title>
          </Body>
        </Header>
        <Content>
          <Body>
            <Text>Welcome to the posts screen</Text>
          </Body>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = {
  getPosts
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsScreen)
