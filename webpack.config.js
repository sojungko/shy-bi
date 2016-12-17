const path = require('path')

module.exports = {
  context: __dirname,
  entry: './js/index.js',
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/public/'),
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  devServer: {
    publicPath: '/public/',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ]
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: [
          path.resolve('js')
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}
