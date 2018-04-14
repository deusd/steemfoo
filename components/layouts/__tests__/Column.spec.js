import 'react-native'
import { shallow } from 'enzyme'
import React from 'react'
import { View } from 'react-native'
import Column from '../Column'

describe('Column component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <Column>
        <View />
      </Column>
    )
  })

  it('should render with no styles', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with children', () => {
    expect(wrapper.contains(<View />)).toBe(true)
  })

  it('should render with given styles', () => {
    const style = {
      padding: 10,
    }
    wrapper.setProps({ style })
    expect(wrapper).toMatchSnapshot()

    expect(wrapper.props().style).toEqual(style)
  })
})
