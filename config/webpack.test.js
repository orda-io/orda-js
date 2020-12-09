const webpackMerge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = function() {
  const merged = webpackMerge.merge(base.config, {
    mode: 'development',
    output: {
      filename: '[name]-test-bundle.js',
      path: base.root('./dist'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            'ts-loader',
          ],
          exclude: /node_modules/,
        },
      ],
    },
  });
  return merged;
};