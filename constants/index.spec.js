import * as constants from './'

describe('constants', () => {
  it('should be available', () => {
    expect(constants).toMatchSnapshot()
  })
})
