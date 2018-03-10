import { Post } from '../types'

export function formatPost(post): Post {
  return {
    title: post.title,
    author: post.author,
    id: post.id,
    metadata: JSON.parse(post.json_metadata || '{}'),
    url: post.url,
    created: new Date(post.created),
    last_update: new Date(post.last_update),
    active: new Date(post.active),
    category: post.category,
    permalink: post.permlink,
  }
}
