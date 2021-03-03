const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.ts', '.js', '.pug', '.css']
    },
    entry: {
        'index.bundle.js': './src/index.ts',
        'aimd1.bundle.js': './src/aimd1.ts',
        'aimd2.bundle.js': './src/aimd2.ts',
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
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
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
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
      /*splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      },*/
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.pug',
            filename: 'index.html',
            chunks: ['global', 'index.bundle.js', 'styles']
        }),
        new HtmlWebpackPlugin({
            template: 'src/aimd1.pug',
            filename: './animations/aimd1.html',
            chunks: ['global', 'aimd1.bundle.js', 'styles']
        }),
        new HtmlWebpackPlugin({
            template: 'src/aimd2.pug',
            filename: './animations/aimd2.html',
            chunks: ['global', 'aimd2.bundle.js', 'styles']
        }),
        new MiniCssExtractPlugin({
          filename: "[name].css",
        }),
    ]
};
