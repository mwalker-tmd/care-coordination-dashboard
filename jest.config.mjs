export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./tests/setupTests.ts'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'mjs'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
