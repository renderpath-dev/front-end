// Goal:
// Configure Jest for JSX-related tests and Babel transformation.

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
};
