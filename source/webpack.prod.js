const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './HyperTable/index.jsx'),
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        library: 'react-hypertable',
        // globalObject: 'this',
        libraryTarget: 'umd',
        // libraryTarget: "commonjs-module"
    },
    externalsType : 'umd',

    optimization: {
        minimizer: [new UglifyJsPlugin()],
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
    },
    mode: 'production',
    externals: {
        // Don't bundle react or react-dom
        react: "react"
        // react: {
        //   commonjs: 'react',
        //   commonjs2: 'react',
        //   amd: 'react',
        //   root: 'React',
        // },
        // 'react-dom': {
        //   commonjs: 'react-dom',
        //   commonjs2: 'react-dom',
        //   amd: 'react-dom',
        //   root: 'ReactDOM',
        // },
      },
};