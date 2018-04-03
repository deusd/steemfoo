// @flow
import React from 'react'

import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  FlatList,
} from 'react-native'
import { Container, Content } from 'native-base'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import numeral from 'numeral'
import Icon from 'react-native-vector-icons/FontAwesome'
import Image from 'react-native-image-progress'
import Row from '../components/layouts/Row'
import Column from '../components/layouts/Column'
import ApolloWrapper from '../components/ApolloWrapper'

const iconSize = 24

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
}

type Props = {
  post: PostType,
}

const Post = ({ post }: Props) => (
  <View key={post.id}>
    <Row style={[styles.container, styles.header]}>
      <Image
        style={{
          width: 50,
          aspectRatio: 1,
          resizeMethod: 'cover',
        }}
        borderRadius={25}
        source={{
          uri:
            'https://images.unsplash.com/photo-1445404590072-16ef9c18bd83?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f680f7ae6fcc0dea32872ad2b6c8f722&auto=format&fit=crop&w=500&q=80',
        }}
      />
      <Column style={{ flex: 1, paddingLeft: 6 }}>
        <Text style={styles.author}>{post.author}</Text>
        <Row style={{ justifyContent: 'space-between' }}>
          <Text style={styles.fontBasic}>somewhere you wish your were</Text>
          <Text style={styles.fontBasicDimmed}>3 days ago</Text>
        </Row>
      </Column>
    </Row>
    <Image
      style={{
        width: '100%',
        aspectRatio: 1,
        resizeMethod: 'contain',
      }}
      source={{
        uri:
          post.imageUrl ||
          'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg',
      }}
    />
    <Row style={{ padding: 10 }}>
      <Row style={{ flex: 1, alignItems: 'flex-start' }}>
        <Icon name="heart-o" size={iconSize} />
        <Icon name="comment-o" size={iconSize} style={{ marginLeft: 16 }} />
      </Row>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontSize: 22 }}>{post.value}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Icon name="retweet" size={iconSize} />
      </View>
    </Row>
    <Row style={{ justifyContent: 'space-between', paddingHorizontal: 10 }}>
      <Text style={styles.likeRepostText}>
        {numeral(post.votes.length).format('0,0')} likes
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
    </View>
  </View>
)

const Loading = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>
      Loading posts <ActivityIndicator />
    </Text>
  </View>
)

const PostsContent = () => (
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
          votes {
            time
            voter
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
          renderItem={({ item }) => <Post post={item} />}
          keyExtractor={item => item.id}
        />
      )
    }}
  </Query>
)

const PostsScreen = () => (
  <Container>
    <Content>
      <PostsContent />
    </Content>
  </Container>
)

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
    color: '#4F4F4F',
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
