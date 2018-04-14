import { Button } from 'native-base'
import numeral from 'numeral'
import React, { Fragment } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Image from 'react-native-image-progress'
import Icon from 'react-native-vector-icons/FontAwesome'
import timeago from 'timeago.js'
import { PostType } from '../constants/types'
import ProfileImageThumb from '../components/ProfileImageThumb'
import Column from '../components/layouts/Column'
import Row from '../components/layouts/Row'
import { ICON_BUTTON_SIZE } from '../constants'

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
              <Text style={styles.fontBasicDimmed}>
                {timeago().format(post.created)}
              </Text>
            </Row>
          </Fragment>
        ) : (
          <Row style={{ justifyContent: 'space-between' }}>
            <Text style={styles.author}>{post.author}</Text>
            <Text style={styles.fontBasicDimmed}>
              {timeago().format(post.created)}
            </Text>
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

export default Post
