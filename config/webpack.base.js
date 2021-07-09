const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const root = path.join.bind(path, ROOT);
const babelrc = require('./babelrc.config.json');

exports.root = root;
exports.config = {
  entry: {
    orda: ['./src/orda.ts'],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [root('src'), 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(js|ts)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: babelrc.presets,
            plugins: babelrc.plugins,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};
