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

    // describe('when called with trending', () => {
    //   it('should return action with promise', () => {
    //     const action = getPosts('trending', options)
    //     expect(action).toHaveProperty('promise')
    //     expect(action.options).toMatchObject(options)
    //   })
    // })
  })
})
