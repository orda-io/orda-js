
module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['mocha', 'karma-typescript'],

        files: [
            'src/**/*.js',
            'src/**/*.ts',
            'test/**/*.ts'
        ],

        browsers: ['ChromeX'],

        customLaunchers: {
            ChromeX: {
                base: "ChromeHeadless"
            }
        },

        preprocessors: {
            "**/*.ts": ['karma-typescript']
        },

        karmaTypescriptConfig: {
            compilerOptions: {
                module: "commonjs",
                moduleResolution: "node"
            },
            bundlerOptions: {
                entrypoints: /\.test\.ts$/,
            },
            tsconfig: './tsconfig.json'
        },
        reporters: ['progress', 'coverage'],

        singleRun: true,
        logLevel: config.LOG_INFO,
        plugins: [
            'karma-mocha',
            'karma-typescript',
            'karma-coverage',
            "karma-chrome-launcher"
        ]
    });

}

