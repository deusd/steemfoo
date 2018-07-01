import React from 'react'
import { Alert } from 'react-native'
import { shallow } from 'enzyme'
import { LoginScreen } from './LoginScreen'

describe('LoginScreen', () => {
  let wrapper
  let login

  beforeEach(() => {
    login = jest.fn()
    wrapper = shallow(<LoginScreen login={login} />)
    jest.spyOn(Alert, 'alert')
  })

  it('should render', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call the login function on pressing the login button', () => {
    wrapper.setProps({ login })
    const button = wrapper.find('TouchableOpacity').first()
    button.props().onPress()
    expect(login).toHaveBeenCalledTimes(1)
  })

  it('should show the alert when there is an error', () => {
    wrapper.setProps({ error: true })
    expect(Alert.alert).toHaveBeenCalledTimes(1)
  })
})
