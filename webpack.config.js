const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const BUILD_DIR = resolve(__dirname, 'public');
const JS_ENTRY = resolve(__dirname, 'src/index.jsx');
const HTML_TEMPLATE = resolve(__dirname, 'index.html');
const CLIENT_DIR = resolve(__dirname, 'src');
const CSS_ENTRY = resolve(__dirname, 'style/app.scss');

module.exports = [
  /**
   *
   *
   * Compiling client-side JS
   *
   *
   * */
  {
    entry: [
      JS_ENTRY,
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
          include: CLIENT_DIR,
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
        template: HTML_TEMPLATE,
      }),
    ],
  },
  /**
   *
   *
   *
   * Compiling SCSS
   *
   *
   * */
  {
    entry: CSS_ENTRY,
    output: {
      path: BUILD_DIR,
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
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
    ],
  },
];
