/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react"
import { Platform, StyleSheet, Alert } from "react-native"
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
} from "native-base"
const options = ["Cancel", "Apple", "Banana", "Watermelon", "Durian"]
const title = "Load an image or take a picture?"

import { Provider } from "react-redux"
import store from "./state/store"

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
})

export default class App extends Component<{}> {
  onLoadImage = () => {
    Alert.alert("Wow", "stuff happened yo")
  }
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Header>
            <Body>
              <Title>VYBE</Title>
            </Body>
          </Header>
          <Content>
            <Text>Welcome to VYBE!!!</Text>
          </Content>
          <Footer>
            <FooterTab>
              <Button>
                <Icon name="camera" />
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
})
