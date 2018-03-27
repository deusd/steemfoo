import React from 'react'

import { StyleSheet, ActivityIndicator, Image, View, Text } from 'react-native'
import { Container, Header, Body, Title, Content } from 'native-base'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Row from '../components/layouts/Row'
import Column from '../components/layouts/Column'

const Post = props => (
  <View key={props.id}>
    <Row style={[styles.container, styles.header]}>
      <Image
        style={{
          width: 50,
          aspectRatio: 1,
          resizeMethod: 'contain',
          borderRadius: 25,
        }}
        source={{
          uri:
            'https://images.unsplash.com/photo-1445404590072-16ef9c18bd83?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f680f7ae6fcc0dea32872ad2b6c8f722&auto=format&fit=crop&w=500&q=80',
        }}
      />
      <Column style={{ flex: 1, paddingLeft: 6 }}>
        <Text style={styles.author}>{props.author}</Text>
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
        resizeMethod: 'cover',
      }}
      source={{
        uri:
          'https://images.unsplash.com/photo-1445404590072-16ef9c18bd83?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f680f7ae6fcc0dea32872ad2b6c8f722&auto=format&fit=crop&w=500&q=80',
      }}
    />
    <View style={styles.container}>
      <Text style={styles.fontBasic}>
        <Text style={{ fontWeight: 'bold' }}>{props.author} </Text>
        {props.title}
      </Text>

      {props.votes && <Text>{props.votes.length} likes</Text>}
    </View>
  </View>
)

const Loading = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>
      Loading posts<ActivityIndicator />
    </Text>
  </View>
)

const PostsContent = () => (
  <Query
    query={gql`
      {
        posts(postType: TRENDING, limit: 20) {
          title
          author
          created
          imageUrl
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

      return data.posts.map(post => <Post key={post.id} {...post} />)
    }}
  </Query>
)

const PostsScreen = () => (
  <Container>
    <Header>
      <Body>
        <Title>VYBE</Title>
      </Body>
    </Header>
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
})

export default PostsScreen
