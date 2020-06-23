import testPage from '../../pageobjects/test.page';


describe('Example visual baseline', () => {

    const baseUrl = browser.options.baseUrl;
    const full = 'fullPage';
    const tabbable = 'tabbablePage';

    beforeAll(async () => {
        await browser.url(baseUrl);
    });

    it('should save baselines', async () => {
        await testPage.headerMenu.waitForDisplayed();

        // Save a screen
        await browser.saveScreen(baseUrl, { /* some options */ });

        // Save an element
        await browser.saveElement(testPage.headerMenu, testPage.headerMenu, { /* some options */ });

        // Save a full page screenshot
        await browser.saveFullPageScreen(full, { /* some options */ });

        // Save a full page screenshot with all tab executions
        await browser.saveTabbablePage(tabbable, { /* some options, use the same options as for saveFullPageScreen */ });
    });
});
