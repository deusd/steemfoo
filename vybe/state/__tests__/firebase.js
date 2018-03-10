import { uploadImage } from '../firebase'

// TODO: add mocks to finish testing image upload
// https://facebook.github.io/jest/docs/en/tutorial-async.html
describe('firebase reducer tests', () => {
  describe('uploadImage', () => {
    it('should throw when no param given', () => {
      expect(uploadImage()).toThrow()
    })

    it('should not throw with a valid param', () => {
      expect(uploadImage('12345')).not.toThrow()
    })
  })
})
