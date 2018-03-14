import moment from 'moment'
import { Post } from '../types'

export function formatPost(post): Post {
  return {
    title: post.title,
    author: post.author,
    id: post.id,
    metadata: JSON.parse(post.json_metadata || '{}'),
    url: post.url,
    created: moment(post.created),
    last_update: moment(post.last_update),
    active: moment(post.active),
    category: post.category,
    permalink: post.permlink,
  }
}
