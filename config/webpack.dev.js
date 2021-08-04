const webpackMerge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = function () {
  return webpackMerge(base.config, {
    entry: {
      orda: './src/index.ts',
    },
    mode: 'development',
    output: {
      path: base.root('dist'),
      filename: '[name]-dev.js',
      library: {
        name: 'orda',
        type: 'umd',
      },
      publicPath: '/',
    },
    devtool: 'source-map',
    devServer: {
      static: {
        directory: base.root('example'),
        // watch: true,
        serveIndex: true,
      },
      watchFiles: [base.root('example/**/*')],
    },
  });
};
