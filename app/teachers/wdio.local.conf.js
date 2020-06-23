const { config } = require('./wdio.shared.conf')

exports.config = {
    ...config,
    ...{
        capabilities: [
            {
                browserName: 'chrome',
                'goog:loggingPrefs': {
                    browser: 'ALL',
                    driver: 'ALL',
                    performance: 'ALL',
                },
                'goog:chromeOptions': {
                    'args': [
                        '--user-agent="SELENIUM Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.36 Safari/537.36"',
                        '--disable-extensions',
                        '--incognito',
                        '--window-size=1600,1200',
                        '--disable-infobars',
                        '--no-sandbox',
                        '--test-type=browser',
                        '--start-maximized',
                        '--disable-dev-shm-usage',
                        '--use-fake-ui-for-media-stream'
                    ],
                    'perfLoggingPrefs': {
                        'enableNetwork': true,
                        'enablePage': false,
                    }
                }
            }
        ]
    }
}
