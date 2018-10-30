import gql from 'graphql-tag'
// @flow
import React from 'react'
import { Query } from 'react-apollo'
import { FlatList } from 'react-native'
import Post from '../components/Post'
import QueryRender from '../components/Query'

const PostsContent = (props: {
  postType: string,
  limit: number,
  tag: string,
  author: string,
}) => (
  <Query
    query={gql`
      {
        posts(postType: ${props.postType}, limit: ${props.limit || 20}, tag: "${
      props.tag
    }") {
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
                repost={props.author && props.author !== item.author}
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

export default PostsContent
