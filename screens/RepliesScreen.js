import gql from 'graphql-tag'
// @flow
import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { StyleSheet, Text, View } from 'react-native'
import ApolloWrapper from '../components/ApolloWrapper'
import Loading from '../components/Loading'
import PageContainer from '../components/PageContainer'
import { Reply as ReplyType } from '../constants/types'
import Reply from '../components/Reply'

function getReplyQuery(author, permalink) {
  return gql`
  {
    replies(
      author: "${author}"
      permlink: "${permalink}"
    ) {
      ...replyFields
      ...repliesRecursive
    }
  }

  fragment replyFields on Reply {
    id
    depth
    body
    author
    authorAccount {
      id
      name
      profileImage
    }
    votes {
      time
      voter
    }
    created
    permalink
    hasReplies
    voteCount
  }

  fragment repliesRecursive on Reply {
    replies {
      ...replyFields
      replies {
        ...replyFields
        replies {
          ...replyFields
          replies {
            ...replyFields
            replies {
              ...replyFields
              replies {
                ...replyFields
                replies {
                  ...replyFields
                  replies {
                    ...replyFields
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
}

type RepliesProps = {
  replies: [ReplyType],
}
const Replies = ({ replies }: RepliesProps) =>
  replies.map(reply => (
    <Fragment key={reply.permalink}>
      <Reply reply={reply} />
      {reply.replies && <Replies replies={reply.replies} />}
    </Fragment>
  ))

type PropTypes = {
  author: string,
  permalink: string,
}

const RepliesContent = ({ author, permalink }: PropTypes) => (
  <Query query={getReplyQuery(author, permalink)}>
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
      return <Replies replies={data.replies} />
    }}
  </Query>
)

const RepliesScreen = (props: any) => {
  const post = props.navigation.state.params.post

  return (
    <PageContainer>
      <RepliesContent author={post.author} permalink={post.permalink} />
    </PageContainer>
  )
}

export default ApolloWrapper(RepliesScreen)
