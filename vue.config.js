const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    configureWebpack: {
        plugins: [
            new BundleAnalyzerPlugin()
        ]
    },

    publicPath: '',

    pluginOptions: {
      cordovaPath: 'src-cordova'
    }
}
