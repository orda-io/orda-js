const webpackMerge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = function () {
  const merged = webpackMerge(base.config, {
    entry: {
      orda: './src/orda.ts',
    },
    mode: 'development',
    output: {
      path: base.root('example'),
      filename: '[name]-dev.js',
      library: {
        name: 'orda',
        type: 'umd',
      },
      publicPath: '/',
    },
    plugins: [],
    devtool: 'source-map',
    module: {},
    devServer: {
      static: {
        directory: base.root('example'),
        // watch: true,
        serveIndex: true,
      },
      watchFiles: [base.root('example/**/*')],
    },
  });
  return merged;
};
