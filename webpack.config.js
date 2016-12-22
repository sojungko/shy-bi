const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './public');
const APP_DIR = path.resolve(__dirname, './js');

const config = {
  entry: APP_DIR + '/index.js',
  output: {
    devtoolLineToLine: true,
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    inline: true,
  },
};

module.exports = config;
