/* eslint-disable */
import React from 'react'

import {
  Platform,
  StyleSheet,
  Alert,
  CameraRoll,
  ActivityIndicator,
  Dimensions,
  Image,
  View,
} from 'react-native'
import {
  ActionSheet,
  Container,
  Header,
  Body,
  Title,
  Button,
  Content,
  Text,
  Footer,
  FooterTab,
  Icon,
  Card,
  CardItem,
} from 'native-base'
import { connect } from 'react-redux'
import { getPosts } from '../state/steem'
import { Post } from '../types'
import Row from '../components/layouts/Row'
import Column from '../components/layouts/Column'

class PostsScreen extends React.Component {
  componentDidMount() {
    this.props.getPosts('latest', { tag: 'steepshot', limit: 20 })
  }

  showLoadingPosts() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          Loading posts<ActivityIndicator />
        </Text>
      </View>
    )
  }

  renderPost(post: Post) {
    return (
      <View key={post.id}>
        <Row
          style={[
            styles.container,
            styles.header,
          ]}
        >
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
            resizeMethod: 'cover',
          }}
          source={{
            uri:
              'https://images.unsplash.com/photo-1445404590072-16ef9c18bd83?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f680f7ae6fcc0dea32872ad2b6c8f722&auto=format&fit=crop&w=500&q=80',
          }}
        />
        <View style={styles.container}>
          <Text style={styles.fontBasic}>
            <Text style={{ fontWeight: 'bold' }}>{post.author} </Text>
            {post.title}
          </Text>

          {post.votes && <Text>{post.votes.length} likes</Text>}
        </View>
      </View>
    )
  }

  showPosts() {
    return <View>{this.props.posts.map(this.renderPost)}</View>
  }

  render() {
    const { isLoadingPosts, posts } = this.props

    return (
      <Container>
        <Header>
          <Body>
            <Title>VYBE</Title>
          </Body>
        </Header>
        <Content>
          {isLoadingPosts ? this.showLoadingPosts() : this.showPosts()}
        </Content>
      </Container>
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

const mapStateToProps = ({ steem }) => ({
  ...steem,
})
const mapDispatchToProps = {
  getPosts,
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsScreen)
