import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from 'react-apollo'

const local = 'http://localhost:8080'
const demo = 'https://wevybe.herokuapp.com'

const getClient = () =>
  new ApolloClient({
    uri: `${__DEV__ ? local : demo}/graphql`,
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
