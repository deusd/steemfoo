import React from 'react'
import { shallow } from 'enzyme'
import ProfileTabs from './ProfileTabs'

describe('ProfileTabs component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<ProfileTabs />)
  })

  it('should render', () => {
    expect(wrapper.shallow()).toMatchSnapshot()
  })

  describe('when pressing a button', () => {
    it('should update state to the selected button', () => {
      wrapper.find({ testID: 'CommentsButton' }).simulate('press')
      wrapper.update()
      expect(wrapper.state().currentButton).toBe('Comments')
    })
  })
})
