const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const extractCSS = new ExtractTextPlugin('bundle.min.css');

module.exports = {
    resolve: {
        extensions: ['.ts', '.js', '.pug', '.css']
    },
    entry: {
        'index.bundle.js': './src/index.ts',
        'bundle.min.css': [
            __dirname + '/src/style.css'
        ]
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'dist/')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                        sourceMap: false
                    }
                }
            },
            {
                test: /\.pug$/,
                exclude: /(node_modules)/,
                use: 'pug-loader'
            },
            {
                test: /\.ts/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'awesome-typescript-loader',
                    options: {
                        useBabel: true
                    }
                }
            },
            {
                test: /\.css$/i,
                use: extractCSS.extract({
                    use: {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                })
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.pug',
            filename: 'index.html',
            chunks: ['global', 'index.bundle.js']
        }),
        extractCSS
    ]
};