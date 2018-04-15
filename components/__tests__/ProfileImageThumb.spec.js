import 'react-native'
import { shallow } from 'enzyme'
import React from 'react'
import ProfileImageThumb from '../ProfileImageThumb'
import { PROFILE_PLACEHOLDER_IMAGE } from '../../constants'

describe('ProfileImageThumb component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<ProfileImageThumb />)
  })

  it('should render', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should should render with the default profile image', () => {
    expect(wrapper.props().source.uri).toBe(PROFILE_PLACEHOLDER_IMAGE)
  })

  it('should should render with the given profile image', () => {
    const profileImage = 'http://www.images.com/image.png'
    const props = {
      ...wrapper.props(),
      profileImage,
    }
    wrapper.setProps(props)
    expect(wrapper.props().source.uri).toBe(profileImage)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with the given style', () => {
    const style = { padding: 10 }
    const props = {
      ...wrapper.props(),
      style,
    }
    wrapper.setProps(props)
    expect(wrapper.props().style).toContain(style)
    expect(wrapper).toMatchSnapshot()
  })
})
