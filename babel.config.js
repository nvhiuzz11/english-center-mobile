module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@src': './src',
          '@hooks': './src/app/hooks',
          '@components': './src/app/components',
          '@constants': './src/app/constants',
          '@screens': './src/app/screens',
          '@store': './src/store',
          '@configs': './src/app/configs',
          '@assets': './src/app/assets',
          '@utils': './src/app/utils',
          '@navigation': './src/navigation',
          '@locales': './src/app/locales/index.js',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      },
    ],
  ],
};
