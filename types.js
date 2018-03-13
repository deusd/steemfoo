export type LocationType = {
  altitude: number,
  heading: number,
  latitude: number,
  longitude: number,
  speed: number,
}

export type ImageType = {
  image: string,
  location: LocationType,
  timestamp: number,
  uri: string,
  height: number,
  width: number,
}

export type PostType = 'trending' | 'latest' | 'hot'

export type PostOptions = {
  tag: string,
  startAtPermaLink: string,
  limit: number,
}

export type Vote = {
  voter: string,
  time: Date,
}

export type Post = {
  title: string,
  author: string,
  id: number,
  metadata: Object,
  votes: Array<Vote>,
  url: string,
  created: Date,
  last_update: Date,
  active: Date,
  category: string,
  permalink: string,
}
