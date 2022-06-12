module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: ['@react-native-community'],
  plugins: ['react-native'],
  env: {
    browser: true,
    es6: true,
    'react-native/react-native': true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'off',
    'react-native/no-raw-text': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-native',
            importNames: ['Text', 'TextInput', 'Alert'],
          },
          {
            name: '@ui-kitten/components',
            importNames: ['Icon', 'Button'],
            message: 'use base components',
          },
          { name: 'expo-constants', message: 'Use MyConstants' },
        ],
      },
    ],
  },
  globals: {
    fetch: false,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.json', '.native.js'],
      },
    },
  },
};
