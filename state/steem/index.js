//@flow
import { cloneDeep } from 'lodash'
import { createAction } from 'redux-action'
import { pending, resolve, reject } from '../../utilities/reducer'
import { VYBE_GET_POSTS } from '../types'
import api from '../../api'
import { PostType, PostOptions } from '../../types'

export const getPosts = createAction(
  VYBE_GET_POSTS,
  (postType: PostType, options: PostOptions) => {
    let promise
    switch (postType) {
      case 'trending':
        promise = api.getTrendingPosts(options)
        break
      case 'latest':
        promise = api.getLatestPosts(options)
        break
      case 'hot':
        promise = api.getHotPosts(options)
        break
      default:
        throw new Error('You must provide a valid post type')
    }

    return {
      options,
      promise,
    }
  }
)

const initialState = {
  posts: [],
  isLoadingPosts: false,
}

export default (state = initialState, action) => {
  let newState = cloneDeep(state)
  switch (action.type) {
    case pending(VYBE_GET_POSTS): // eslint-disable-line
      newState = { ...newState, isLoadingPosts: true, error: undefined }
      break
    case resolve(VYBE_GET_POSTS): {
      const posts = newState.posts
      const newPosts = action.payload.data

      newState = {
        ...newState,
        isLoadingPosts: false,
        posts: posts.concat(newPosts.map(post => post)),
        error: undefined,
      }
      break
    }
    case reject(VYBE_GET_POSTS):
      newState = {
        ...newState,
        isLoadingPosts: false,
        error: action.payload.error,
      }
      break
    default:
      break
  }

  return newState
}
