import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from 'react-apollo'

const demo = 'https://us-central1-vybe-209906.cloudfunctions.net/api'

export const getClient = () =>
  new ApolloClient({
    uri: `${demo}/graphql`,
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
