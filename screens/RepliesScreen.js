import gql from 'graphql-tag'
// @flow
import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ApolloWrapper from '../components/ApolloWrapper'
import Loading from '../components/Loading'
import PageContainer from '../components/PageContainer'
import ProfileImageThumb from '../components/ProfileImageThumb'
import Column from '../components/layouts/Column'
import Row from '../components/layouts/Row'
import { ICON_BUTTON_SIZE } from '../constants'
import { Reply as ReplyType } from '../constants/types'

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
type ReplyProps = {
  reply: ReplyType,
}
const Reply = ({ reply }: ReplyProps) => (
  <Column style={styles.reply}>
    <Row style={{ width: '100%' }}>
      <ProfileImageThumb
        style={{ marginRight: 10 }}
        profileImage={(reply.authorAccount || {}).profileImage}
      />
      <View style={styles.full}>
        <Text style={styles.authorText}>
          {reply.author} <Text style={styles.commentText}>{reply.body}</Text>{' '}
        </Text>
      </View>
      <Icon
        style={{ marginLeft: 10 }}
        name="heart-o"
        size={ICON_BUTTON_SIZE}
        color="#4F4F4F"
      />
    </Row>
    <Row style={{ marginTop: 10 }}>
      <View style={styles.full}>
        <Text>2 weeks ago</Text>
      </View>
      <View style={[styles.full, { alignItems: 'center' }]}>
        <Text>$0.92</Text>
      </View>
      <View style={[styles.full, { alignItems: 'flex-end' }]}>
        <Text>
          {reply.voteCount} likes{' '}
          <Icon name="reply" size={ICON_BUTTON_SIZE} color="#4F4F4F" />
        </Text>
      </View>
    </Row>
  </Column>
)

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

const styles = StyleSheet.create({
  reply: {
    padding: 10,
    marginTop: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#7D7D7D',
  },
  full: {
    flex: 1,
  },
  authorText: {
    fontWeight: 'bold',
  },
  commentText: {
    fontWeight: 'normal',
  },
})

export default ApolloWrapper(RepliesScreen)
