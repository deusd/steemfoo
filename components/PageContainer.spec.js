import 'react-native'
import { shallow } from 'enzyme'
import React from 'react'
import { View } from 'react-native'
import PageContainer from './PageContainer'

describe('PageContainer component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PageContainer />)
  })

  it('should render', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with children', () => {
    wrapper.setProps({ children: <View /> })
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.contains(<View />)).toBe(true)
  })
})
