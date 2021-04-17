const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  plugins: [
    new PrerenderSPAPlugin({
      // Required - The path to the webpack-outputted app to prerender.
      staticDir: path.join(__dirname, 'adist'),
      outputDir: path.join(__dirname, 'prerendered'),
      // Required - Routes to render.
      routes: [ '/', '/game']
    }),
    new BundleAnalyzerPlugin()
  ]
}
