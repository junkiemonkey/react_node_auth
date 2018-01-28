const path = require('path'),
  {
    NoEmitOnErrorsPlugin,
    DefinePlugin,
    SourceMapDevToolPlugin,
    HotModuleReplacementPlugin,
    LoaderOptionsPlugin,
    optimize: {
      CommonsChunkPlugin,
      OccurrenceOrderPlugin ,
      UglifyJsPlugin
    }
  } = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  { smart, smartStrategy } = require('webpack-merge'),
  { stringify } = JSON,
  { env: { NODE_ENV } } = process,
  { dependencies } = require('./package.json'),
  packages = createPackages(dependencies),

  config = {
    // context: path.resolve(__dirname, 'app'),
    entry: {
      packages,
      app: './app/app.js'
    },
    output: {
      path: path.resolve(__dirname, 'static'),
      filename: 'js/[name].js',
      sourceMapFilename: 'js/[name].js.map',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: /app/,
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css-loader!resolve-url-loader!sass-loader?sourceMap')
        },
      ]
    },
    plugins: [
      new NoEmitOnErrorsPlugin(),
      new DefinePlugin({
        process: {
          env: {
            BROWSER: stringify(true),
            NODE_ENV: stringify(NODE_ENV),
          }
        }
      }),
      new CommonsChunkPlugin({
        name: 'packages',
        filename: 'js/vendors.js',
        // minChunks: Infinity
      }),
      new SourceMapDevToolPlugin({
        include: 'app',
        exclude: 'packages'
      }),
      new ExtractTextPlugin('css/style.css', { allChunks: true })
    ]
  };

if (NODE_ENV === 'development') {
  module.exports = smartStrategy({
    entry: {
      packages: 'prepend'
    }
  })(config, {
    entry: {
      packages: [
        'react-hot-loader/patch',
        'react-hot-loader'
      ]
    },
    plugins: [
      new HotModuleReplacementPlugin(),
      new LoaderOptionsPlugin({
        debug: true,
        options: {
          sassLoader: {
            includePaths: [path.resolve(__dirname, 'app')]
          },
          eslint: {
            quiet: true
          },
          context: config.context
        }
      })
    ],
    output: {
      pathinfo: true,
    },
    devServer: {
      port: 3000,
      hot: true,
      inline: true,
      historyApiFallback: {
        index: 'app.html'
      },
      contentBase: './static',
      proxy: {
        '/api/*': 'http://localhost:8080'
      }
    }
  });
}

if (NODE_ENV === 'production') {
  module.exports = smart(config, {
    plugins: [
      new OccurrenceOrderPlugin(),
      new UglifyJsPlugin({
        compress: { warnings: false },
        comments: false,
        sourceMap: true,
        mangle: true,
        minimize: true
      })
    ]
  });
}

function createPackages(dependencies) {
  const clientPacs =  Object.keys(dependencies).filter(el => el !== 'babel-polyfill' && el !== 'react' && el !== 'react-dom' && el !== 'config' && el !== 'mongoose' && el.indexOf('koa') === -1 && el.indexOf('passport') === -1 && el !== 'slugify' && el !== 'await-busboy' && el !== 'pug');
  return ['babel-polyfill', 'react', 'react-dom', ...clientPacs];
}