var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');
// process.env.NODE_ENV = 'production'

var prod = process.env.NODE_ENV === 'production';
console.log(prod);
var config = {
  entry: {
    bundle: './client/app.js',
    style: './client/app.scss'
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].js',
    publicPath: '/',
    library: '[name]'
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
    new ExtractTextPlugin('style.css', {allChunks: true}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};

if(prod) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false,
        screw_ie8: true
      }
    })
  );
}else {
  config.devtool = "source-map";
  config.devServer = {
    historyApiFallback: {
      index: '/static/index.html'
    },
    // contentBase: '/static/',
    proxy: {
      '/api/*':  'http://localhost:8080'
    }
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
};
module.exports = config;