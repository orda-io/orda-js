const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const root = path.join.bind(path, ROOT);

exports.root = root;
exports.config = {
  entry: {
    ortoo: ['./src/ortoo.ts'],
  },
  // mode: 'development',
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [root('src'), 'node_modules'],
  },

  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js)$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};
