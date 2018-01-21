const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");


// const extractLess = new ExtractTextPlugin({
//     filename: "main.css",
//     disable: process.env.NODE_ENV === "development"
// });


const config = {
    entry: './source/main.js',
    output: {
        path:'/',
        filename: 'index.js',
    },
    devServer: {
        inline:true,
        hot:true,
        port: 8080
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0', 'react-hmre'], // 'react-hmre'
                    plugins: ['transform-class-properties', 'react-hot-loader/babel']
                }
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Home',
            inject: true,
            template: './index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    // plugins: [HtmlWebpackPluginConfig]
};
module.exports = config;