var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');

var NODE_ENV = process.env.NODE_ENV || 'development';
console.log(NODE_ENV);
var config = {
  entry: './client/app.js',
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel',
        exclude: /\/node_modules\//,
        include: path.join(__dirname, 'client')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!resolve-url!sass-loader?sourceMap')
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new ExtractTextPlugin('css/style.css', {allChunks: true}),
  ]
};

if(NODE_ENV == 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false,
        unsafe: true
      }
    })
  );
}else {
  config.devtool = "eval";
  config.devServer = {
    historyApiFallback: {
      index: '/templates/index.html'
    },
    proxy: {
      '/api/*':  'http://localhost:8080'
    }
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
};
module.exports = config;