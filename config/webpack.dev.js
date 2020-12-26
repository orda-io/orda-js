const webpackMerge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = function() {
  const merged = webpackMerge.merge(base.config, {

    mode: 'development',
    output: {
      filename: '[name]-dev-bundle.js',
      path: base.root('./dist'),
      publicPath: '/',
    },
    devServer: {
      contentBase: base.root('./dist'),
      hot: true,
      overlay: {
        warnings: true,
        errors: true,
      },
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