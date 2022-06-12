const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './source/HyperTable/index.jsx'),
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        library: 'react-hypertable',
        globalObject: 'this',
        libraryTarget: 'umd',
    },

    //   output: {
    //     path: './dist',
    //     filename: 'libpack.js',
    //     library: 'libpack',
    //     libraryTarget:'umd'
    // },
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
        alias: {
            src: path.resolve(__dirname, 'src/'),
          },
    },
    mode: 'production',
    externals: {
        // Don't bundle react or react-dom
        react: {
          commonjs: 'react',
          commonjs2: 'react',
          amd: 'react',
          root: 'React',
        },
        'react-dom': {
          commonjs: 'react-dom',
          commonjs2: 'react-dom',
          amd: 'react-dom',
          root: 'ReactDOM',
        },
      },
};