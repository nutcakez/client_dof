const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  entry: './src/main.js',
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}