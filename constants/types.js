export type Vote = {
  voter: string,
  time: string,
}

export type Account = {
  id: number,
  name: string,
  created: string,
  profileImage: string,
  coverImage: string,
  about: string,
  location: string,
}

export type PostType = {
  title: string,
  author: string,
  authorAccount: Account,
  id: number,
  metadata: any,
  votes: [Vote],
  url: string,
  imageUrl: string,
  created: string,
  lastUpdate: string,
  active: string,
  category: string,
  permalink: string,
  location: string,
  profileImage: string,
  value: string,
  reposts: number,
  voteCount: number,
  commentCount: number,
}
