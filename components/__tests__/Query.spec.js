import 'react-native'
import { shallow } from 'enzyme'
import React from 'react'
import { View } from 'react-native'
import gql from 'graphql-tag'
import Query from '../Query'
import Loading from '../Loading'

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
    wrapper = shallow(
      <Query query={query}>
        {data => <View testID="TestComponent">{data}</View>}
      </Query>
    )
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

  describe('when not loading', () => {
    it('should not show the loading component', () => {
      wrapper.setState({ refetching: false })
      wrapper.setProps({ loading: false })
      expect(wrapper.contains(<Loading />)).toBe(false)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when an error occurs', () => {
    it('should show the error', () => {
      wrapper.setProps({ error: true })
      wrapper.setState({ refetching: false })
      expect(wrapper.props().testID).toBe('ErrorWrapper')
    })

    it('should should stop refetching when promise resolves', done => {
      const refetch = jest.fn(() => Promise.resolve())
      wrapper.setProps({ error: true, refetch })
      wrapper
        .find({ testID: 'RefetchButton' })
        .props()
        .onPress()
      setImmediate(() => {
        expect(wrapper.state('refetching')).toBe(false)
        done()
      })
    })

    it('should should stop refetching when promise rejects', done => {
      const refetch = jest.fn(() => Promise.reject())
      wrapper.setProps({ error: true, refetch })
      wrapper
        .find({ testID: 'RefetchButton' })
        .props()
        .onPress()
      setImmediate(() => {
        expect(wrapper.state('refetching')).toBe(false)
        done()
      })
    })
  })

  describe('when loaded with data', () => {
    it('should render with child when data loads', () => {
      const data = 'testData'
      wrapper.setProps({ data })
      expect(
        wrapper
          .find({ testID: 'TestComponent' })
          .render()
          .text()
      ).toBe('testData')
    })
  })
})
