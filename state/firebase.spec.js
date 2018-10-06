import reducer, { uploadImage } from './firebase'

// TODO: add mocks to finish testing image upload
// https://facebook.github.io/jest/docs/en/tutorial-async.html
describe('firebase tests', () => {
  describe('uploadImage action', () => {
    it('should throw when no param given', () => {
      expect(uploadImage()).toThrow()
    })

    it('should not throw with a valid param', () => {
      expect(uploadImage('12345')).not.toThrow()
    })
  })

  describe('reducer tests', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual({
        uploadingImage: false,
      })
    })

    it('should handle the FIREBASE_UPLOAD_IMAGE_PENDING action', () => {
      const action = { type: 'FIREBASE_UPLOAD_IMAGE_PENDING' }
      expect(reducer(undefined, action)).toEqual({ uploadingImage: true })
    })

    it('should handle the FIREBASE_UPLOAD_IMAGE_FULFILLED action', () => {
      const action = {
        type: 'FIREBASE_UPLOAD_IMAGE_FULFILLED',
        payload: '12345',
      }

      expect(reducer(undefined, action)).toEqual({
        uploadingImage: false,
        data: '12345',
      })
    })

    it('should handle the FIREBASE_UPLOAD_IMAGE_REJECTED action', () => {
      const action = { type: 'FIREBASE_UPLOAD_IMAGE_REJECTED', payload: [] }

      expect(reducer(undefined, action)).toEqual({
        uploadingImage: false,
        error: [],
      })
    })
  })
})
