module.exports = function (config) {
    config.set({
        basePath: '',
        
        frameworks: ['mocha', 'karma-typescript'],

        files: [
            'src/**/*.ts',
            'test/**/*.ts'
        ],

        browsers: ['ChromeHeadless'],

        customLaunchers: {
            ChromeX: {
                base: "ChromeHeadless"
            }
        },

        // reporters: ['progress', 'coverage'],

        preprocessors: {
            "**/*.ts": ['karma-typescript'],
        },
        singleRun : true,
        logLevel: config.LOG_DEBUG,
        plugins: [
            'karma-mocha',
            // 'karma-coverage',
            'karma-typescript',
            'karma-typescript-preprocessor',
            'karma-chrome-launcher'
        ]
    });

}

