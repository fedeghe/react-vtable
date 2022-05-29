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
    libraryTarget: "commonjs-module"
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
      {
        test: /\.less$/i,
        use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader' 
          }, {
            loader: 'less-loader'
          }]
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  mode: 'production',
  externals: {
    react: "react"
  }
};