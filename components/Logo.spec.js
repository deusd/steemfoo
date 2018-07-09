import 'react-native'
import { shallow } from 'enzyme'
import React from 'react'
import { Logo } from './Logo'

describe('Logo component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Logo />)
  })

  it('should render with no styles', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with styles', () => {
    wrapper = shallow(<Logo style={{ fontSize: 30 }} />)
    expect(wrapper.props().style).toContainEqual({ fontSize: 30 })
  })
})
