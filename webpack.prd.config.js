const path =require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig,{
    output: {
        filename:'main.js',
        path:path.resolve(__dirname,'build')
    }
})