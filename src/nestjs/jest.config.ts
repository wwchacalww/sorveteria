export default {
  displayName: {
    name: '@core',
    color: 'magentaBright',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@core/sorveteria\\-hakuna/(.*)$':
      '<rootDir>/../../../node_modules/@core/sorveteria-hakuna/dist/$1',
  },
};
