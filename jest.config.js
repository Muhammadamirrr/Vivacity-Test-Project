
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./src'], // Update this to your test file's location
  moduleDirectories: ['node_modules', './src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
