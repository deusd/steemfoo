import 'react-native'
import { shallow } from 'enzyme'
import React from 'react'
import Reply from '../Reply'

const reply = {
  author: 'jahangirwifii',
  authorAccount: {
    profileImage: 'https://steemitimages.com/u/jahangirwifii/avatar',
  },
  body: '@tipu need again 2.5...',
  voteCount: 0,
  value: '$123.45',
}

describe('Reply component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Reply reply={reply} />)
  })

  describe('should render with the mock reply content', () => {
    expect(wrapper).toMatchSnapshot()

    it('with the profile image', () => {
      expect(wrapper.find('ProfileImageThumb').props().profileImage).toEqual(
        reply.authorAccount.profileImage
      )
    })

    it('with the author text', () => {
      expect(wrapper.find({ testID: 'authorText' }).props().children).toContain(
        reply.author
      )
    })

    it('with the reply body text', () => {
      expect(
        wrapper.find({ testID: 'replyMessageText' }).props().children
      ).toEqual(reply.body)
    })

    it('with the reply value text', () => {
      expect(
        wrapper.find({ testID: 'replyValueText' }).props().children
      ).toEqual(reply.value)
    })

    it('with the vote count', () => {
      expect(
        wrapper.find({ testID: 'replyVoteCount' }).props().children[0]
      ).toEqual(reply.voteCount)
    })
  })

  it('should show the placeholder image if no author profile image', () => {
    const authorAccount = reply.authorAccount
    authorAccount.profileImage = null
    wrapper.setProps({
      reply: {
        ...reply,
        authorAccount,
      },
    })

    expect(wrapper.find('ProfileImageThumb').props().profileImage).toBeNull()
    expect(wrapper).toMatchSnapshot()
  })
})
