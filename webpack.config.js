var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var prod = process.env.NODE_ENV == 'production';

var config = {
  devtool: prod ? null : 'source-map',
  entry: {
    bundle: './client/app.js',
    style: './client/app.scss'
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].js',
    publicPath: '/static/',
    library: '[name]'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: __dirname + '/static',
    proxy: {
      '/api/*':  'http://localhost:3000'
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loaders: ['babel'],
        exclude: [/node_modules/],
        include: path.join(__dirname, 'client')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url!sass-loader?sourceMap')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css', {allChunks: true})
  ]
};

module.exports = config;