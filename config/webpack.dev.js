const webpackMerge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = function () {
  const merged = webpackMerge.merge(base.config, {
    mode: 'development',
    output: {
      filename: '[name]-dev.js',
      path: base.root('./dist'),
      publicPath: '/',
    },
    devtool: 'source-map',
    devServer: {
      contentBase: base.root('./dist'),
      hot: true,
      overlay: {
        warnings: true,
        errors: true,
      },
    },
  });
  return merged;
};
