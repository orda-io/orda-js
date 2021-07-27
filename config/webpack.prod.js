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
    },
    plugins: [],
    devtool: 'source-map',
    module: {},
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
