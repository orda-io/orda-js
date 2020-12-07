// Karma configuration
// Generated on Wed Nov 25 2020 05:45:57 GMT+0900 (Korean Standard Time)

const webpackConfig = require('./webpack.dev.conf.js');

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon', 'source-map-support'],

    // list of files / patterns to load in the browser
    files: [
      // { pattern: 'src/**/*.ts', included: false },
      {
        pattern: 'test/**/*.ts',
        included: true, /* should be true to run tests */
      },
    ],

    // list of files / patterns to exclude
    exclude: [
      '**/*.swp',
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './src/**/*.ts': ['webpack'],
      './test/**/*.ts': ['webpack'],
    },

    client: {
      mocha: {
        timeout: 6000, // 6 seconds - upped from 2 seconds
      },
    },

    // use the dev webpack configuration
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      mode: webpackConfig.mode,
      devtool: 'inline-source-map',
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    // coverageIstanbulReporter: istanbul.coverageIstanbulReporter,
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'text' },
        { type: 'html', subdir: 'reprt-html' }
      ],
    },

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
