const webpackMerge = require('webpack-merge');
const base = require('./webpack.base');

const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// function getUglifyOptions(supportES2015, enableCompress) {
//   const uglifyCompressOptions = {
//     pure_getters: true /* buildOptimizer */,
//     // PURE comments work best with 3 passes.
//     // See https://github.com/webpack/webpack/issues/2899#issuecomment-317425926.
//     passes: 2, /* buildOptimizer */
//   };
//
//   return {
//     ecma: supportES2015 ? 6 : 5,
//     warnings: false, // TODO verbose based on option?
//     ie8: false,
//     mangle: true,
//     compress: enableCompress ? uglifyCompressOptions : false,
//     output: {
//       ascii_only: true,
//       comments: false,
//     },
//   };
// }


module.exports = function() {
  const merged = webpackMerge.merge(base.config, {
    mode: 'production',
    output: {
      path: base.root('./dist'),
      publicPath: '/',
      sourceMapFilename: '[file].map',
      filename: '[name].[chunkhash].bundle.js',
      chunkFilename: '[name].[chunkhash].chunk.js',
    },
    plugins: [
      new HashedModuleIdsPlugin(),
    ],
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
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: true,
          parallel: true,
          cache: base.root('webpack-cache/uglify-cache'),
          uglifyOptions: {
            ecma: 5,
            warnings: false, // TODO verbose based on option?
            ie8: false,
            mangle: true,
            // compress: enableCompress ? uglifyCompressOptions : false,
            output: {
              ascii_only: true,
              comments: false,
            },
          },
        }),
      ],
    },
  });
  console.log(merged['module'].rules);
  return merged;
};