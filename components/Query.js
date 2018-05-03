// @flow
import React from 'react'
import { Query as GQLQuery } from 'react-apollo'
import { Text, Button, View } from 'react-native'
import Loading from '../components/Loading'

class QueryRender extends React.Component<{
  loading: boolean,
  error: any,
  data: any,
  refetch: Promise,
  children: Function,
}> {
  state = {
    refetching: false,
  }

  unsetRefetch() {
    this.setState({ refetching: false })
  }

  handleRefetch = refetch => () => {
    this.setState({ refetching: true })

    refetch()
      .then(this.unsetRefetch)
      .catch(this.unsetRefetch)
  }

  render() {
    const { loading, error, data, refetch } = this.props

    if (loading || this.state.refetching) return <Loading />
    if (error)
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          testID={'ErrorWrapper'}
        >
          <Text>Error :(</Text>
          <Button title={'Retry'} onPress={this.handleRefetch(refetch)} />
        </View>
      )

    return <View>{this.props.children(data)}</View>
  }
}

export default QueryRender
