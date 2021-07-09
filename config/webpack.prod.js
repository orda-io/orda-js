const base = require('./webpack.base');
const webpackMerge = require('webpack-merge');
const terser = require('terser-webpack-plugin');

module.exports = function () {
  const merged = webpackMerge.merge(base.config, {
    entry: {
      orda: './src/orda.ts',
    },
    mode: 'production',
    output: {
      filename: '[name].bundle.js',
      library: 'orda',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: `this`,
    },
    plugins: [],
    devtool: 'source-map',
    module: {},
    optimization: {
      minimize: true, // TODO: should be true
      minimizer: [
        new terser({
          // sourceMap: false,
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
          extractComments: true,
          parallel: true,
        }),
      ],
    },
  });
  return merged;
};
