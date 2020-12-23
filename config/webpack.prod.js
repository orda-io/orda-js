const webpackMerge = require('webpack-merge');
const base = require('./webpack.base');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = function() {
  const merged = webpackMerge.merge(base.config, {
    entry: {
      ortoo: './src/ortoo.ts',
    },
    mode: 'production',
    output: {
      path: base.root('./example'),
      // publicPath: '/',
      // sourceMapFilename: '[file].map',
      filename: '[name].bundle.js',
      // chunkFilename: '[name].chunk.js',
      library: 'ortoo',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: `this`,
    },
    plugins: [],
    devtool: 'inline-source-map',
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
      minimize: false,
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
  console.log(merged);
  return merged;
};