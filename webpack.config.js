const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  target: 'web',
  context: path.join(__dirname),
  entry: {
    'main': './src/main'
  },
  devtool: 'cheap-module-sourcemap',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.glsl(f|v)?$/,
        loader: 'raw-loader'
      }
    ]
  },
  resolve: { extensions: ['.ts', '.tsx', '.js'] },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      title: 'Tactics'
    }),
    new HtmlWebpackHarddiskPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ]
}
