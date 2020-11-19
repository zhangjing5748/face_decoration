const path = require('path')
// const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const devConfig = require('./webpack.dev')
const proConfig = require('./webpack.prod')

// const WasmModuleWebpackPlugin = require('wasm-module-webpack-plugin')
const commonConfig = {
  entry: {
    index: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      chrome: '67',
                      safari: '10.0'
                    }
                  }
                ]
              ]
              // plugins: ['@babel/plugin-syntax-dynamic-import', WasmModuleWebpackPlugin.BabelPlugin]
            }
          }
        ]
      },
      {
        test: /\.worker\.js$/, //以.worker.js结尾的文件将被worker-loader加载
        use: {
          loader: 'worker-loader'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['.js', '.wasm'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  }
}
const generatePlugin = config => {
  let plugins = [new CleanWebpackPlugin(), new VueLoaderPlugin()]
  // const filesInDll = fs.readdirSync(path.resolve(__dirname,'../dll'))
  // filesInDll.forEach()
  Object.keys(config.entry).forEach(key => {
    plugins.push(
      new HtmlWebpackPlugin({
        filename: `${key}.html`,
        template: path.join(__dirname, '../index.html'),
        chunks: ['runtime', 'vendors', key],
        minify: {
          minimize: true, //打包为最小值
          minifycss: true // 压缩html模板中的css样式
        }
      })
      // new WasmModuleWebpackPlugin.WebpackPlugin()
    )
  })
  return plugins
}
commonConfig.plugins = generatePlugin(commonConfig)

module.exports = env => {
  if (env && env.production) {
    return merge(commonConfig, proConfig)
  } else {
    return merge(commonConfig, devConfig)
  }
}
