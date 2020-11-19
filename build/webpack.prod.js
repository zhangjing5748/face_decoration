// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const publicUrl = 'https://arhello.sensetime.com/webar/gugong_calendar/' //根据不同的项目更改路径
// const publicUrl = 'https://arhello.sensetime.com/webar/webartest/' //根据不同的项目更改路径
const publicUrl = 'https://arhello.sensetime.com/webar/wishes/' //根据不同的项目更改路径
const prodConfig = {
    mode: 'production',
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", 'postcss-loader']
                })
            },
            {
                test: /\.(mp3|mp4)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: '[name]_[hase].[ext]',
                    outputPath: '/assets/audios/',
                    publicPath: `${publicUrl}assets/img`
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: '/assets/img/',
                        publicPath: `${publicUrl}assets/img`
                    }
                }
            },
        ]
    },
    plugins: [

        new CopyWebpackPlugin([{
                from: path.resolve(__dirname, '../src/static'),
                to: 'static',
                ignore: ['.*']
            },
            {
                from: path.resolve(__dirname, '../src/**/*.wasm'),
                flatten: true,
                to: 'wasm'
            }
        ]),
        new ExtractTextPlugin({
            filename: "./assets/css/[name].css",
            publicPath: "/"
        })

    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxSize: 244000,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -1,
                    // filename: 'vendors.js'
                },
                default: {
                    priority: -2,
                    reuseExistingChunk: true,
                }
            }
        },
        minimize: true,
        minimizer: []
            // minimizer: [
            //   new TerserPlugin({ // 删除console
            //     // sourceMap: true,
            //     terserOptions: {
            //       // compress: {
            //       //   drop_console: true,
            //       // }
            //     }
            //   })
            // ]
    },
    output: {
        publicPath: publicUrl,
        filename: 'js/[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: 'js/[name].[contenthash].js'
    },
}

module.exports = prodConfig;