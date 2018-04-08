// @flow
import React, { Fragment } from 'react'

import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  FlatList,
} from 'react-native'
import { Container, Content, Button } from 'native-base'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import numeral from 'numeral'
import Icon from 'react-native-vector-icons/FontAwesome'
import Image from 'react-native-image-progress'
import Row from '../components/layouts/Row'
import Column from '../components/layouts/Column'
import ApolloWrapper from '../components/ApolloWrapper'
import ProfileImageThumb from '../components/ProfileImageThumb'
import Loading from '../components/Loading'
import { ICON_BUTTON_SIZE } from '../constants'
import PageContainer from '../components/PageContainer'

const replyQuery = gql`
  {
    replies(
      author: "brittuf"
      permlink: "get-a-free-cryptopuppy-and-guaranteed-dividends-with-buy-of-the-day"
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

const Reply = ({ reply }) => (
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
    <Row>
      <View style={styles.full}>
        <Text>2 weeks ago</Text>
      </View>
      <View style={styles.full}>
        <Text>$0.92</Text>
      </View>
      <View style={styles.full}>
        <Text>
          123 likes{' '}
          <Icon name="reply" size={ICON_BUTTON_SIZE} color="#4F4F4F" />
        </Text>
      </View>
    </Row>
  </Column>
)

const Replies = ({ replies }) =>
  replies.map(reply => (
    <Fragment key={reply.permalink}>
      <Reply reply={reply} />
      {reply.replies && <Replies replies={reply.replies} />}
    </Fragment>
  ))

const RepliesContent = () => (
  <Query query={replyQuery}>
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

const RepliesScreen = props => {
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
