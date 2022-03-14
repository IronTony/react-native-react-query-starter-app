module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@i18n': './src/i18n',
          '@routes': './src/routes',
          '@scenes': './src/scenes',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@env': './src/env.js',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
