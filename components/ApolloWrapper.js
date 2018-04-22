import ApolloClient from 'apollo-boost'
import React from 'react'
import { Platform } from 'react-native'
import { ApolloProvider } from 'react-apollo'

const android = 'http://10.0.2.2:8080'
const ios = 'http:localhost:8080'
const demo = 'https://wevybe.herokuapp.com'
const localUrl = Platform.select({
  android,
  ios,
})

export const getClient = () =>
  new ApolloClient({
    uri: `${__DEV__ ? localUrl : demo}/graphql`,
  })

const ApolloWrapper = WrappedComponent =>
  class ApolloComponent extends React.Component {
    render() {
      return (
        <ApolloProvider client={getClient()}>
          <WrappedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }

export default ApolloWrapper
