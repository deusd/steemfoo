import 'react-native'
import { shallow } from 'enzyme'
import React from 'react'
import View from 'react-native'
import Query from '../Query'
import Loading from '../Loading'
import gql from 'graphql-tag'
// import Loading from '../Loading'

const query = gql`
  {
    posts(postType: TRENDING, limit: 1) {
      id
      title
    }
  }
`

describe('Query component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Query query={query}>{() => <View />}</Query>)
  })
  it('should render', () => {
    expect(wrapper.shallow()).toMatchSnapshot()
  })

  describe('when loading', () => {
    it('should show the loading component', () => {
      wrapper.setProps({ loading: true })
      expect(wrapper.contains(<Loading />)).toBe(true)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when refetching', () => {
    it('should show the loading component', () => {
      wrapper.setState({ refetching: true })
      expect(wrapper.contains(<Loading />)).toBe(true)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when an error occurs', () => {
    it('should show the error', () => {
      wrapper.setProps({ error: true })
      expect(wrapper.props().testID).toBe('ErrorWrapper')
    })
  })
})
