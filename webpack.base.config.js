const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge')

const dev = require('./webpack.dev.config')

const prd = require('./webpack.prd.config')

let config = null

if(process.env.NODE_ENV == 'development'){
    config = dev
}else{
    config = prd
}

module.exports = merge({

    mode: process.env.NODE_ENV,
    entry:  path.resolve(__dirname, 'src/index.js'),

    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     include: path.resolve(__dirname, 'src'),
            //     exclude: /node_modules/,
            //     use: [{
            //         loader: 'babel-loader',
            //         options: { presets: ["es2015", "stage-0"] }
            //     }],
            // },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'src'),
                use: [{
                    loader: 'html-loader',
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        })
    ]

},config)