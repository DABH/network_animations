const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJs = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const extractCSS = new ExtractTextPlugin('bundle.min.css');

module.exports = {
    resolve: {
        extensions: ['.ts', '.js', '.pug', '.css']
    },
    entry: {
        'index.bundle.js': './src/index.ts',
        'aimd1.bundle.js': './src/aimd1.ts',
        'aimd2.bundle.js': './src/aimd2.ts',
        'bundle.min.css': [
            __dirname + '/src/style.css',
            __dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css'
        ]
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '/network_animations/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
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
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "./img/[name].[ext]"
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new UglifyJs({
            uglifyOptions: {
                compress: true
            }
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.pug',
            filename: 'index.html',
            chunks: ['global', 'index.bundle.js']
        }),
        new HtmlWebpackPlugin({
            template: 'src/aimd1.pug',
            filename: './animations/aimd1.html',
            chunks: ['global', 'aimd1.bundle.js']
        }),
        new HtmlWebpackPlugin({
            template: 'src/aimd2.pug',
            filename: './animations/aimd2.html',
            chunks: ['global', 'aimd2.bundle.js']
        }),
        extractCSS
    ]
};