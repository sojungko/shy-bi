const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

const BUILD_DIR = resolveApp('public');
const APP_JSX = resolveApp('src/index.jsx');
const APP_HTML = resolveApp('index.html');
const APP_DIR = resolveApp('src');

module.exports = [
  /** Compiling client-side JS */
  {
    entry: [
      APP_JSX,
      require.resolve('./polyfills'),

    ],
    output: {
      devtoolLineToLine: true,
      path: BUILD_DIR,
      filename: 'bundle.js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx'],
    },
    module: {
      rules: [
        {
          exclude: [
            /\.html$/,
            /\.(js|jsx)$/,
            /\.css$/,
            /\.scss$/,
            /\.json$/,
            /\.svg$/,
          ],
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        {
          test: /\.(js|jsx)$/,
          include: APP_DIR,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties'],
            cacheDirectory: true,
          },
        },
      // {
      //   test: /\.css$/,
      //   loader: ['style-loader', 'css-loader', 'postcss-loader'],
      // },
        {
          test: /\.svg$/,
          loader: 'file-loader',
          query: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: APP_HTML,
      }),
    ],
  },
  /** Compiling SCSS */
  {
    entry: path.resolve(__dirname, 'style/app.scss'),
    output: {
      path: BUILD_DIR,
      filename: 'styles.css',
    },
    resolve: {
      extensions: ['.scss', '.css'],
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
    ],
  },
];
