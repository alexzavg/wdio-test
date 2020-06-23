const path = require('path');
const { join } = require('path');
const conf = require('../../env/config.data.json');
const argv = require('yargs').argv;

let baseUrl;
let env = conf.envs[Object.keys(conf.envs)[0]];

if(argv['env']&&(argv['env']!=='prod')){
    if((argv['env'].indexOf('test-')>-1)) {
        baseUrl = `https://${argv['env']}.skyeng.link`;
    }
    if((argv['env'].indexOf('local')>-1)) {
        baseUrl = `--baseUrl=https://skyeng.loc`;
    }
    // Prod environment (by default)
} else {
    baseUrl = 'https://skyeng.ru'
}

const init = function () {
    for (let i = 0; i < process.argv.length; i++) {
        let obj = process.argv[i];
        let match = obj.match(/^--env=(.*)$/);
        if (match && match.length > 0) {
            env = conf.envs[match[1].split('-')[0]];
        }
    }
};

init();

exports.config = {
    runner: 'local',
    baseUrl: baseUrl,
    params: env.params,
    specs: [
        'app/teachers/specs/**/*.spec.js',

    ],
    suites: {
        teachers_visual_baseline: [
            'app/teachers/specs/visual_baseline/*.spec.js'
        ],
        teachers_visual_regression: [
            'app/teachers/specs/visual_regression/*.spec.js'
        ]
    },
    maxInstances: 10,
    logLevel: 'error',
    outputDir: path.resolve(__dirname, 'logs'),
    waitforTimeout: 180000,
    connectionRetryTimeout: 180000,
    connectionRetryCount: 3,
    framework: 'jasmine',
    reporters: ['spec'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 180000,
        showColors: true,
        isVerbose: true,
        helpers: [
            require.resolve('@babel/register')
        ]
    },
    services: [
        'chromedriver',
        [
            'image-comparison',
            // The options
            {
                // Some options, see the docs for more
                baselineFolder: join(process.cwd(), './screenshots/baseline/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), './teachers/screenshots'),
                savePerInstance: true,
                autoSaveBaseline: true,
                blockOutStatusBar: true,
                blockOutToolBar: true,
                // NOTE: When you are testing a hybrid app please use this setting
                isHybridApp: true,
                // Options for the tabbing image
                tabbableOptions:{
                    circle:{
                        size: 18,
                        fontSize: 18,
                        // ...
                    },
                    line:{
                        color: '#ff221a', // hex-code or for example words like `red|black|green`
                        width: 3,
                    }
                }
            }
        ]
    ]
}
