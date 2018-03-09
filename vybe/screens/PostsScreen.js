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

class PostsScreen extends React.Component {
  render() {
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

export default connect()(PostsScreen)
