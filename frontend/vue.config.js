const path = require('path')

module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/my-project/'
    : '/',
  outputDir: path.resolve(__dirname, '../server/public')
}
