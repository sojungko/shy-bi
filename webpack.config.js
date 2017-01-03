const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

const BUILD_DIR = resolveApp('public');
const APP_JSX = resolveApp('src/index.jsx');
const APP_HTML = resolveApp('public/index.html');
const APP_DIR = resolveApp('src');
const APP_NODE_MODULES = resolveApp('node_modules');

const nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .filter(folder => !path.isAbsolute(folder))
  .map(resolveApp);

const config = {
  entry: [
    require.resolve('./polyfills'),
    APP_JSX
  ],
  output: {
    devtoolLineToLine: true,
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    fallback: nodePaths,
    extensions: ['.js', '.json', '.jsx', ''],
  },
  module: {
    loaders: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/
        ],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }, {
        test: /\.(js|jsx)$/,
        include: APP_DIR,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1'],
          cacheDirectory: true
        }
      }, {
        test: /\.css$/,
        loader: 'style!css?importLoaders=1!postcss'
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.svg$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ],
  },

  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ]
      }),
    ];
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: APP_HTML,
    }),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(APP_NODE_MODULES)
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
};

module.exports = config;
