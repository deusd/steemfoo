import gql from 'graphql-tag'
// @flow
import React from 'react'
import { Query } from 'react-apollo'
import { FlatList, Text, View } from 'react-native'
import ApolloWrapper from '../components/ApolloWrapper'
import Loading from '../components/Loading'
import PageContainer from '../components/PageContainer'
import Post from '../components/Post'

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
  >
    {({ loading, error, data }) => {
      if (loading) return <Loading />
      if (error)
        return (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>Error :(</Text>
          </View>
        )

      return (
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
      )
    }}
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
