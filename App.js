/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import PostsScreen from './screens/PostsScreen'

// disable annoying yellow box warnings
console.disableYellowBox = true;  // eslint-disable-line

const client = new ApolloClient({
  uri: 'https://us-central1-vybe-6b570.cloudfunctions.net/api/graphql',
})

const App = () => (
  <ApolloProvider client={client}>
    <PostsScreen />
  </ApolloProvider>
)

export default App
