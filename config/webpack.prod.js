const base = require('./webpack.base');
const webpackMerge = require('webpack-merge');
const terser = require('terser-webpack-plugin');

module.exports = function () {
  return webpackMerge(base.config, {
    entry: {
      orda: './src/index.ts',
    },
    mode: 'production',
    output: {
      filename: '[name].js',
      library: {
        name: 'orda',
        type: 'umd',
      },
      publicPath: '/',
      globalObject: 'this',
    },
    plugins: [],
    devtool: 'source-map',
    optimization: {
      minimize: true,
      minimizer: [
        new terser({
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
};
