const webpackMerge = require('webpack-merge');
const base = require('./webpack.base');
const wp = require('webpack')

module.exports = function () {
  return webpackMerge(base.config, {
    entry: {
      orda: './src/index.ts',
    },
    mode: 'development',
    output: {
      path: base.root('dist'),
      filename: '[name].js',
      library: {
        name: 'orda',
        type: 'umd',
      },
      publicPath: '/',
      globalObject: 'this',
    },
    plugins: [
      new wp.EvalSourceMapDevToolPlugin({
        test: /\.(ts|js|css)($|\?)/i,
        moduleFilenameTemplate: 'webpack-internal://[namespace]/[resource-path]?[hash]',
      })
    ],
    devtool: false,
  });
};
