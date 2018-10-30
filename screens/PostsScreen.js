// @flow
import React from 'react'
import ApolloWrapper from '../components/ApolloWrapper'
import PageContainer from '../components/PageContainer'
import PostsContent from '../components/PostsContent'

class PostsScreen extends React.Component<{
  navigation: any,
}> {
  render() {
    return (
      <PageContainer>
        <PostsContent postType="TRENDING" navigation={this.props.navigation} />
      </PageContainer>
    )
  }
}

export default ApolloWrapper(PostsScreen)
