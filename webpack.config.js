const debug = process.env.NODE_ENV !== "production";

const path = require('path');
const webpack = require('webpack');

console.log('is production:', !debug );

/**
 * PATHS
 */
const BUILD_DIR = path.join(__dirname, 'client', 'public');
const APP_DIR = path.join(__dirname, 'client', 'src');
const STYLE_DIR = path.join(__dirname, 'client', 'src', 'styles');
const IMG_DIR = path.join(__dirname, 'client', 'src', 'images');
const NO_PARSE_EXCLUSIONS = [
  path.join(__dirname, 'node_modules', 'react', 'dist', 'react.min.js'),
  path.join(__dirname, 'node_modules', 'react', 'dist', 'react.js')
];

/**
 * PLUGINS
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  context: APP_DIR,

  entry: './index.js',

  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },

  noInfo: true,

  devtool: debug ? 'eval' : null,

  cache: true,

  debug: debug,

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: APP_DIR,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      },
      {
        test: /\.css$/, loader: "style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        include: STYLE_DIR,
        loader: ExtractTextPlugin.extract("style", "css!sass")
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: IMG_DIR,
        loader: "file-loader?name=/images/[name].[ext]"
      }
    ],
    noParse: NO_PARSE_EXCLUSIONS
  },

  resolve: {
    extensions: ["", ".js", ".jsx", ".scss"],
    root: APP_DIR,
    modulesDirectories: ["node_modules"]
  },

  watchOptions: {
    aggregateTimeout: 100
  },

  watch: debug,

  plugins: debug ? [
    new ExtractTextPlugin('style.css'),
    new LiveReloadPlugin({
      appendScriptTag: true
    })
  ] : [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};