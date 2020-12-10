const webpackMerge = require('webpack-merge');
const base = require('./webpack.base');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = function() {
  const merged = webpackMerge.merge(base.config, {
    mode: 'production',
    output: {
      path: base.root('./dist'),
      publicPath: '/',
      sourceMapFilename: '[file].map',
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
    },
    plugins: [],
    devtool: 'source-map',
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
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
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
  console.log(merged['module'].rules);
  return merged;
};