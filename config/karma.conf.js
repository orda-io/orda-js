// Karma configuration
// Generated on Wed Nov 25 2020 05:45:57 GMT+0900 (Korean Standard Time)
const webpackConfig = require('./webpack.test.js')();

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      {
        pattern: 'test/**/*.ts',
        included: true /* should be true to run tests */,
      },
    ],

    // list of files / patterns to exclude
    exclude: [
      '**/*.swp',
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './test/**/*.ts': ['webpack', 'sourcemap'],
    },

    client: {
      mocha: {
        timeout: 6000, // 6 seconds - upped from 2 seconds
      },
    },

    // use the dev webpack configuration
    webpack: {
      mode: webpackConfig.mode,
      resolve: webpackConfig.resolve,
      module: webpackConfig.module,
      devtool: 'inline-source-map',
    },

    webpackServer: {
      noInfo: true,
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
