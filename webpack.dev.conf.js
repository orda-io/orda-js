const path = require('path');

module.exports = {
  entry: {
    ortoo: ['./src/ortoo.ts'],
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  node: {
    fs: 'empty',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['@jsdevtools/coverage-istanbul-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
