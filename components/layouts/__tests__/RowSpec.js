import 'react-native'
import { shallow } from 'enzyme'
import React from 'react'
import { View } from 'react-native'
import Row from '../Row'

describe('Row component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <Row>
        <View />
      </Row>
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

    expect(wrapper.props().style).toEqual([{ flexDirection: 'row' }, style])
  })
})
