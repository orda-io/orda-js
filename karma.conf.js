module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'karma-typescript'],

        files: [
            // './test/index.js',
            '**/*.spec.ts'
        ],

        exclude: [
        ],

        karmaTypescriptConfig: {

        }, 

        preprocessors: {
            "**/*.ts": ['karma-typescript']
        },

        typescriptPreprocessor: {
            options: {
                sourceMap: true
            }
        },

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['ChromeHeadless'],

        customLaunchers: {
          ChromeX: {
            base: "ChromeHeadless"
          }
        },    

        singleRun: true,

        captureTimeout: 60000,

        concurrency: Infinity,

        plugins: [
            'karma-mocha',
            'karma-chrome-launcher',
            'karma-typescript',
            'karma-typescript-preprocessor'
        ]
    })
}