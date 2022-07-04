const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: {
        index: path.resolve(__dirname, './source/VTable/index.jsx'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        // library: {
        //     name: '@fedeghe/react-vtable',
        //     type: 'umd',
        // },
        libraryTarget: "umd"
    },
    // devtool: 'inline-source-map',
    externalsType : "umd",

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },

    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        // alias: {
        //     react: path.resolve(__dirname, './../node_modules/react')
        // }
    },
    mode: 'production',
    
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
      }
};