const { links, pages } = require('./pagesLinks');
const puppeteer = require('puppeteer');

(async () => {
    const browserURL = 'http://localhost:9222'; 
    const browser = await puppeteer.connect({ browserURL });

    const page = await browser.newPage();
    await page.waitForTimeout(500);

    for (let i = 0; i < links.length; i++) {
        try {
            await page.goto(`https://webmaster.yandex.ru/site/https:${links[i]}:443/turbo/sources/`);
            await page.waitForTimeout(3000);

            const inputSelector = '.input__control';
            await page.waitForSelector(inputSelector);
            const input = await page.$(inputSelector);
            await input.type(pages[i]);
            await page.waitForTimeout(3000);

            const addButtonSelector = '.button_side_right.button_theme_action.button_align_left.button_size_m.one-line-submit__submit.form__submit.i-bem.button_js_inited';
            await page.waitForSelector(addButtonSelector);
            const addButton = await page.$(addButtonSelector);
            await addButton.click();
            await page.waitForTimeout(3000);

            const buttonOnSelector = '.button2_view_classic';
            const buttonOn = await page.$(buttonOnSelector);
            if (buttonOn) {
                await buttonOn.click();
                await page.waitForTimeout(3000);
            }

            const buttonConfirmSelector = '.button_theme_action';
            const buttonConfirm = await page.$(buttonConfirmSelector);
            if (buttonConfirm) {
                await buttonConfirm.click();
            }

            console.log(links[i]);
        } catch (error) {
            console.error(`Ошибка на ссылке ${links[i]}:`, error);
        }
    }
})();