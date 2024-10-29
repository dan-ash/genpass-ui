module.exports = {
  pwa: {
    name: 'Password Generator',
    themeColor: '#4f46e5',
    msTileColor: '#4f46e5',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://fonts.googleapis.com/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-stylesheets'
          }
        }
      ]
    },
    manifestOptions: {
      display: 'standalone',
      background_color: '#ffffff'
    }
  }
} 