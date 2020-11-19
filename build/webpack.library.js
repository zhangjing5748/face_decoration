const path = require('path')
const fs = require('fs')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
// const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
// const webpack = require('webpack')
// const EsmWebpackPlugin = require('@purtuga/esm-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/js/senseAR.js',
  output: {
    path: path.resolve(__dirname, '../library'),
    filename: 'js/senseAR.js',
    library: 'SenseAR',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [{
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'img/'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    chrome: "67",
                    safari: "10.0"
                  }
                }
              ]
            ],
            // plugins: ['@babel/plugin-syntax-dynamic-import', WasmModuleWebpackPlugin.BabelPlugin]
          }
        }]
      },
      {
        test: /\.worker\.js$/, //以.worker.js结尾的文件将被worker-loader加载
        use: {
          loader: 'worker-loader'
        }
      }

    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new uglify()
  ]
}