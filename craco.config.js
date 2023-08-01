const path = require('path')

module.exports = {
  reactScriptsVersion: 'react-scripts',
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: ['node_modules', 'src/assets']
        }
      }
    }
  },
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/components/layouts'),
      '@store': path.resolve(__dirname, 'src/redux'),
      '@styles': path.resolve(__dirname, 'src/assets/scss'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@utils': path.resolve(__dirname, 'src/utility'),
      '@services': path.resolve(__dirname, 'src/utility/services'),
      '@context': path.resolve(__dirname, 'src/utility/context'),
      '@hooks': path.resolve(__dirname, 'src/utility/hooks'),
      '@views': path.resolve(__dirname, 'src/views')
    }
  }
}
