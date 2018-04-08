// @flow
import React, { Fragment } from 'react'

import { StyleSheet, View, Text, FlatList } from 'react-native'
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
import PageContainer from '../components/PageContainer'
import { ICON_BUTTON_SIZE } from '../constants'

type Vote = {
  voter: string,
  time: string,
}

type Account = {
  id: number,
  name: string,
  created: string,
  profileImage: string,
  coverImage: string,
  about: string,
  location: string,
}

type PostType = {
  title: string,
  author: string,
  authorAccount: Account,
  id: number,
  metadata: any,
  votes: [Vote],
  url: string,
  imageUrl: string,
  created: string,
  lastUpdate: string,
  active: string,
  category: string,
  permalink: string,
  location: string,
  profileImage: string,
  value: string,
  reposts: number,
  voteCount: number,
  commentCount: number,
}

type PostProps = {
  post: PostType,
  onViewAllReplies: Function,
}

const Post = ({ post, onViewAllReplies }: PostProps) => (
  <View key={post.id}>
    <Row style={[styles.container, styles.header]}>
      <ProfileImageThumb profileImage={post.authorAccount.profileImage} />
      <Column style={{ flex: 1, paddingLeft: 6 }}>
        {post.category ? (
          <Fragment>
            <Text style={styles.author}>{post.author}</Text>
            <Row style={{ justifyContent: 'space-between' }}>
              <Text style={styles.fontBasicDimmed}>in {post.category}</Text>
              <Text style={styles.fontBasicDimmed}>3 days ago</Text>
            </Row>
          </Fragment>
        ) : (
          <Row style={{ justifyContent: 'space-between' }}>
            <Text style={styles.author}>{post.author}</Text>
            <Text style={styles.fontBasicDimmed}>3 days ago</Text>
          </Row>
        )}
      </Column>
    </Row>
    <Image
      style={{
        width: '100%',
        aspectRatio: 1,
      }}
      resizeMode={'cover'}
      source={{
        uri:
          post.imageUrl ||
          'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg',
      }}
    />
    <Row style={{ padding: 10 }}>
      <Row style={{ flex: 1, alignItems: 'flex-start' }}>
        <Icon name="heart-o" size={ICON_BUTTON_SIZE} />
        <Icon
          name="comment-o"
          size={ICON_BUTTON_SIZE}
          style={{ marginLeft: 16 }}
        />
      </Row>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontSize: 22 }}>{post.value}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Icon name="retweet" size={ICON_BUTTON_SIZE} />
      </View>
    </Row>
    <Row style={{ justifyContent: 'space-between', paddingHorizontal: 10 }}>
      <Text style={styles.likeRepostText}>
        {numeral(post.voteCount).format('0,0')} likes
      </Text>
      <Text style={styles.likeRepostText}>
        {numeral(1234).format('0,0')} Resteems
      </Text>
    </Row>
    <View style={styles.container}>
      <Text style={styles.fontBasic}>
        <Text style={{ fontWeight: 'bold' }}>{post.author} </Text>
        {post.title}
      </Text>
      {post.commentCount > 0 && (
        <Button transparent onPress={() => onViewAllReplies(post)}>
          <Text>{`View all ${post.commentCount} comments`}</Text>
        </Button>
      )}
    </View>
  </View>
)

const PostsContent = props => (
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

class PostsScreen extends React.Component {
  render() {
    return (
      <PageContainer>
        <PostsContent navigation={this.props.navigation} />
      </PageContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  author: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fontBasic: {
    fontSize: 14,
  },
  fontBasicBold: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  fontBasicDimmed: {
    fontSize: 14,
    color: '#858585',
  },
  header: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#F2F2F2',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F2F2F2',
    alignItems: 'center',
  },
  likeRepostText: {
    fontSize: 14,
  },
})

export default ApolloWrapper(PostsScreen)
