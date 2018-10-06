/*
 * @format
 * @flow
 */

import React from 'react'
import { Text, Button, View } from 'react-native'
import Loading from './Loading'

type Props = {
  loading: Boolean,
  error: any,
  data: any,
  refetch: Promise,
  children: Function,
}

class QueryRender extends React.Component<Props> {
  constructor(props) {
    super(props)

    this.state = {
      refetching: false,
    }

    this.unsetRefetch = () => {
      this.setState({ refetching: false })
    }

    this.handleRefetch = refetch => () => {
      this.setState({ refetching: true })

      refetch()
        .then(this.unsetRefetch)
        .catch(this.unsetRefetch)
    }
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
          <Button
            testID="RefetchButton"
            title={'Retry'}
            onPress={this.handleRefetch(refetch)}
          />
        </View>
      )

    return <View>{this.props.children(data)}</View>
  }
}

export default QueryRender
