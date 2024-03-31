module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    //if you already have other plugin just paste this lines below
    [
      'babel-plugin-module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
          assets: './src/assets',
          components: './src/components',
          theme: './src/theme',
          screens: './src/screens',
          types: './src/types',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
  ],
};
