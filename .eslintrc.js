module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'off',
    semi: [2, 'always'],
    curly: ['off', 'multi'],
    'prettier/prettier': 0,
  },
  ignorePatterns: ['icons', 'mocks'],
  plugins: ['react-native'],
};
