const path = require('path')
module.exports = {
    mode: process.env.NODE_ENV,
    entry: path.resolve(__dirname, 'lib/vodPlayer/index.js'),
    output: {
        filename: 'VodPlayer.js',
        path: path.resolve(__dirname, 'vdist')
    },
    devtool: false
}