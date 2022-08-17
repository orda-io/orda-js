const webpackConfig = require('./webpack.dev.js')();

const isCoverage = process.argv.some((argument) => /--coverage/.test(argument));

webpackConfig.module.rules[0].exclude = [/node_modules/];

if (isCoverage) {
  webpackConfig.module.rules.push({
    enforce: 'post',
    test: /\.ts$/,
    use: 'coverage-istanbul-loader',
    exclude: /node_modules/,
  });
}

const karmaConfig = {
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
  exclude: ['**/*.swp'],

  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {
    'test/**/*.ts': ['webpack'],
  },
  plugins: [
    'karma-webpack',
    'karma-mocha',
    'karma-chai',
    'karma-sinon',
    'karma-chrome-launcher',
    'karma-mocha-reporter',
  ],
  client: {
    mocha: {
      timeout: 6000, // 6 seconds - upped from 2 seconds
    },
  },

  // use the dev webpack configuration
  webpack: {
    target: 'web',
    mode: webpackConfig.mode,
    output: webpackConfig.output,
    module: webpackConfig.module,
    plugins: webpackConfig.plugins,
    resolve: webpackConfig.resolve,
    devtool: 'inline-source-map',
  },

  webpackServer: {
    noInfo: true,
  },

  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  reporters: isCoverage ? ['coverage-istanbul'] : ['mocha'],

  coverageIstanbulReporter: {
    reports: ['html', 'lcovonly', 'text-summary'],
    verbose: true,
    fixWebpackSourcePaths: true,
    skipFilesWithNoCoverage: true,
  },

  // enable / disable colors in the output (reporters and logs)
  colors: true,

  // level of logging
  // possible values: 'DISABLE' || 'ERROR' || 'WARN' || 'INFO' || 'DEBUG'
  logLevel: 'DEBUG',

  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: true,

  // start these browsers
  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: ['ChromeHeadless'],

  // Continuous Integration mode
  singleRun: isCoverage,

  // Concurrency level
  concurrency: Infinity,
};

module.exports = function (config) {
  config.set(karmaConfig);
};
