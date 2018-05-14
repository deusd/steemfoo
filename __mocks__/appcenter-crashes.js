jest.mock('appcenter-crashes', () => ({
  setEnabled: new Promise().resolve(),
  generateTestCrash() {},
}))
