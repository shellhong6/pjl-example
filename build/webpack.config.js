const path = require('path')
const Util = require('./util')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpackConfig = {
  entry: {},
  mode: "development",
  output: {
    path: Util.distPath,
    filename: '[name]_[hash:7].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: path.resolve('/Users/hongshell/zx-workspace/temp/jsx-loader/src/loader/jsx-loader.js')
        // loader: 'jsx-loader'
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader'
          }]
        }),
      }
    ]
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src/loader')
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name]_[hash:7].css'
    }),
    new CleanWebpackPlugin(
      {
        root: Util.distPath, //根目录
        verbose: true, //开启在控制台输出信息
        dry: false //启用删除文件
      }
    )
  ]
};
Util.doPageConfig(webpackConfig)
module.exports = webpackConfig