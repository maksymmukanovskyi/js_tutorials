const path = require('path');
const HtmlWebPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
  },
  plugins: [
    new HtmlWebPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: '/.js$/',
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
};
