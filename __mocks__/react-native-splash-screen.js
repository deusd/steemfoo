export default {
  show: jest.fn().mockImplementation(() => {
    console.log('show splash screen') // eslint-disable-line no-console
  }),
  hide: jest.fn().mockImplementation(() => {
    console.log('hide splash screen') // eslint-disable-line no-console
  }),
}
