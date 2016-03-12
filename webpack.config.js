var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  resolve: {
    root: [
      path.resolve('./src')
    ]
  },
  entry: {
    init: './src/init.js'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  },
  module: {
    wrappedContextCritical: false,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel', 
        query: {
          presets: ['es2015']
        }
      }, 
      { test: /\.html/, loader: 'raw' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.styl$/, loader: 'style!css!stylus'},
      { test: /\.json$/, loader: 'json'}
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    title: "Alice's Game Client",
    favicon: 'src/assets/logo.png'
  })]

}
