jest.mock('rn-fetch-blob', () => {
  return {
    DocumentDir: () => {},
    ImageCache: {
      get: {
        clear: () => {},
      },
    },
  }
})
