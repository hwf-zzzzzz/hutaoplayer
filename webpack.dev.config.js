const path =require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig,{
    output: {
        filename:'main.js',
        path:path.resolve(__dirname,'dist'),
    },

      devServer: {
        static: {
          directory: path.join(__dirname, './src'),
        },
        port: 9000,
        hot: true,
      },


    //   devServer: {
    //     port: 3006,
    //     // historyApiFallback: {
    //     //     index: '/dist/index.html',
    //     // },
    //     contentBase: './',
    //     publicPath: '/dist/',
    //     hot: true,
    //   },
    devtool: false
})