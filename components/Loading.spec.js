import 'react-native'
import { shallow } from 'enzyme'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import Loading from './Loading'

describe('Loading component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Loading />)
  })

  it('should render with no styles', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have an activity indicator', () => {
    expect(wrapper.contains(<ActivityIndicator />)).toBe(true)
  })
})
