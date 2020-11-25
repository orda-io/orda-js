const path = require('path');

module.exports = {

    coverageIstanbulReporter: {

        // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/73c25ce79f91010d1ff073aa6ff3fd01114f90db/packages/istanbul-reports/lib
        reports: ['html', 'lcovonly', 'text-summary'],

        // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
        dir: path.join(__dirname, 'coverage'),

        // Combines coverage information from multiple browsers into one report rather than outputting a report
        // for each browser.
        combineBrowserReports: true,

        // if using webpack and pre-loaders, work around webpack breaking the source path
        fixWebpackSourcePaths: true,

        // Omit files with no statements, no functions and no branches covered from the report
        skipFilesWithNoCoverage: true,

        // Most reporters accept additional config options. You can pass these through the `report-config` option
        'report-config': {
            // all options available at: https://github.com/istanbuljs/istanbuljs/blob/73c25ce79f91010d1ff073aa6ff3fd01114f90db/packages/istanbul-reports/lib/html/index.js#L257-L261
            html: {
                // outputs the report in ./coverage/html
                subdir: 'html'
            }
        },

        // enforce percentage thresholds
        // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
        thresholds: {
            emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
            // thresholds for all files
            global: {
                statements: 80,
                lines: 80,
                branches: 80,
                functions: 80
            },
            // // thresholds per file
            // each: {
            //     statements: 100,
            //     lines: 100,
            //     branches: 100,
            //     functions: 100,
            //     overrides: {
            //         'baz/component/**/*.js': {
            //             statements: 98
            //         }
            //     }
            // }
        },

        verbose: true // output config used by istanbul for debugging
    }

}