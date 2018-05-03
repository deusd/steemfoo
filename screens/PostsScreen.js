import gql from 'graphql-tag'
// @flow
import React from 'react'
import { Query } from 'react-apollo'
import { FlatList } from 'react-native'
import ApolloWrapper from '../components/ApolloWrapper'
import PageContainer from '../components/PageContainer'
import Post from '../components/Post'
import QueryRender from '../components/Query'

const PostsContent = (props: any) => (
  <Query
    query={gql`
      {
        posts(postType: TRENDING, limit: 20) {
          id
          title
          author
          created
          imageUrl
          value
          voteCount
          commentCount
          category
          permalink
          authorAccount {
            id
            name
            profileImage
            location
          }
        }
      }
    `}
    notifyOnNetworkStatusChange
  >
    {result => (
      <QueryRender {...result}>
        {data => (
          <FlatList
            data={data.posts}
            renderItem={({ item }) => (
              <Post
                post={item}
                onViewAllReplies={() =>
                  props.navigation.navigate('Replies', { post: item })
                }
              />
            )}
            keyExtractor={item => item.permalink}
          />
        )}
      </QueryRender>
    )}
  </Query>
)

class PostsScreen extends React.Component<{
  navigation: any,
}> {
  render() {
    return (
      <PageContainer>
        <PostsContent navigation={this.props.navigation} />
      </PageContainer>
    )
  }
}

export default ApolloWrapper(PostsScreen)
