import { getPosts } from '../steem'

jest.mock('axios')

describe('steem tests', () => {
  // const options = { tag: test }
  describe('getPosts', () => {
    it('should throw when called with no post type', () => {
      expect(getPosts()).toThrow()
    })

    it('should throw when called with unknown post type', () => {
      expect(getPosts('fakemethodtype')).toThrow()
    })

    it('should not throw when called with a know post type', () => {
      expect(getPosts('latest')).not.toThrow()
      expect(getPosts('trending')).not.toThrow()
      expect(getPosts('hot')).not.toThrow()
    })
  })
})
