var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //注意生产环境下删除
    //devtool: 'eval-source-map',
    entry: {
        index: [
            path.resolve(__dirname, './src/index.jsx')
        ],
        //报错，如果不分包就没事
        //vendor: ['react', 'react-dom', 'react-redux', 'react-router', 'redux']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js?[hash]',
        publicPath: './build/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                loaders: ['react-hot', 'babel'],
                exclude: path.resolve(__dirname, 'node_modules'),
                include: __dirname,
            },
            {
                test: /\.json$/,
                loaders: ['json-loader'],
                exclude: path.resolve(__dirname, 'node_modules'),
                include: __dirname,
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader:'url?limit=10240&name=img/[name]_[hash:5].[ext]',
            },
        ]
    },
    plugins: [

        new webpack.NoErrorsPlugin(),
        //new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js?[hash]'),
        new ExtractTextPlugin("[name].css?[hash]"),
        new webpack.DefinePlugin({'process.env.NODE_ENV':'"production"'}),
        new uglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: '../index.html',
        })
    ]
};
