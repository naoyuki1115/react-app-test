/* eslint-disable*/
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/* eslint-enable*/

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: 'main.js',
    path: `${__dirname}/dist`,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local', // mode: true でもOK
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: {
      util: false,
    },
  },
  target: ['web', 'es5'],
  devServer: {
    hot: true,
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    static: {
      directory: `${__dirname}/dist`,
    },
  },
  plugins: [new HtmlWebpackPlugin({ template: `${__dirname}/index.html` }), new webpack.HotModuleReplacementPlugin()],
}
