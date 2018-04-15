import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ProfileImageThumb from '../components/ProfileImageThumb'
import Column from '../components/layouts/Column'
import Row from '../components/layouts/Row'
import { ICON_BUTTON_SIZE } from '../constants'
import { Reply as ReplyType } from '../constants/types'

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
        <Text style={styles.authorText} testID="authorText">
          {reply.author}
        </Text>{' '}
        <Text style={styles.commentText} testID="replyMessageText">
          {reply.body}
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
        <Text testID="replyVoteCount">
          {reply.voteCount} likes{' '}
          <Icon name="reply" size={ICON_BUTTON_SIZE} color="#4F4F4F" />
        </Text>
      </View>
    </Row>
  </Column>
)

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

export default Reply
