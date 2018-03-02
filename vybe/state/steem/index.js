//@flow
import { cloneDeep } from "lodash"
import { createAction } from "redux-action"
import { pending, resolve, reject } from "../../utilities/reducer"
import { VYBE_GET_POSTS } from "../types"



steem.api.setOptions({ url: "https://api.steemit.com" })
steem.api.getDiscussionsByCreated(
  {
    tag: "steepshot",
    limit: "30",
  },
  (err, result) => {
    if (err) {
      console.error(err)
    }
    console.log(result)
  }
)

type PostType = 'trending' | 'latest' | 'hot'
export const getTrendingPosts = createAction(VYBE_GET_POSTS, (postType: PostType, startAtPermaLink: string) => {
  switch (postType) {
    case 'trending':
    break;
    case: 'lastest':
    break;
    case: 'hot':
    break;
    default:
    throw new Error('You must provide a valid post type')
  }
})

const initialState = {
  posts: [],
  isLoadingPosts: false,
}

export default (state = initialState, action) => {
  let newState = cloneDeep(state)

  switch (action.type) {
    default:
      break
  }

  return newState
}
