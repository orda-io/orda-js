const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const root = path.join.bind(path, ROOT);

exports.root = root;
exports.config = {
  entry: {
    orda: [root('src/orda.ts')],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [root('src'), 'node_modules'],
    alias: {
      '@ooo': root('src'),
      '@test': root('test'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/, root('test')],
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
};
