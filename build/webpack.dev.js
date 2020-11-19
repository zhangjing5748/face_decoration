const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.(mp3|mp4)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: '[name]_[hase].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../src'),
    // open: true,
    port: 8080,
    host: '0.0.0.0',
    hot: true,
    useLocalIp: true,
    // publicPath: "/",
    // noInfo: true,
    // hotOnly: true,
    https: true
    // before(app) {
    //   app.get('/static', (req, res) => {
    //     console.log(req.url)
    //   })
    // }
    // proxy: {
    //   '/': {
    //     target: 'https://10.4.97.21:9209',
    //     secure: false
    //   }
    // }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: './assets/css/[name].css',
      publicPath: '/'
    })
  ],
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[name].chunk.js'
  }
}

module.exports = devConfig
