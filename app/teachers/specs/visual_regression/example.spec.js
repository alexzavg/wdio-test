import testPage from '../../pageobjects/test.page';


describe('Example visual regression', () => {

    let baseUrl = browser.options.baseUrl;
    let full = 'fullPage';
    let tabbable = 'tabbablePage';

    beforeEach( async () => {
        await browser.url(baseUrl);
    });

    it('should compare images with a baselines', async () => {
        await testPage.headerMenu.waitForDisplayed();

        // Check a screen
        await expect(browser.checkScreen(baseUrl, { /* some options */ })).toEqual(0);

        // Check an element
        await expect(browser.checkElement(testPage.headerMenu, testPage.headerMenu, { /* some options */ })).toEqual(0);

        // Check a full page screenshot
        await expect(browser.checkFullPageScreen(full, { /* some options */ })).toEqual(0);

        // Check a full page screenshot with all tab executions
        await expect(browser.checkTabbablePage(tabbable, { /* some options, use the same options as for checkFullPageScreen */ })).toEqual(0);
    });
});
