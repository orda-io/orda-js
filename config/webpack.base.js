const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const root = path.join.bind(path, ROOT);

exports.root = root;
exports.config = {
  entry: {
    ortoo: ['./src/ortoo.ts'],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [root('src'), 'node_modules'],
  },

  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};
