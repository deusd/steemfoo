//@flow

import axios from 'axios'

const BASE_URL = 'https://us-central1-vybe-6b570.cloudfunctions.net/'
const urls = {
  posts: {
    TRENDING: 'getTrendingPosts',
    HOT: 'getHotPosts',
    LATEST: 'getLatestPosts',
  },
}

function getApiUrl(path) {
  return `${BASE_URL}${path}`
}

function getPosts(type: string, options: Object) {
  const path = getApiUrl(type)
  return axios.get(path, { params: { ...options } })
}

export function getTrendingPosts(options: Object) {
  return getPosts(urls.posts.TRENDING, options)
}

export function getLatestPosts(options: Object) {
  return getPosts(urls.posts.LATEST, options)
}

export function getHotPosts(options: Object) {
  return getPosts(urls.posts.HOT, options)
}

export default {
  getTrendingPosts,
  getLatestPosts,
  getHotPosts,
}
