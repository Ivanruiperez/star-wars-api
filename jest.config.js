module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.jsx?$': 'babel-jest', // Añadir esta línea para manejar archivos JS/JSX
    },
    transformIgnorePatterns: [
      '/node_modules/(?!@web3-storage/multipart-parser)', // Añadir esta línea para transformar módulos ESM específicos
    ],
  };