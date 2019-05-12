const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function getScreenshot(url, type, quality, fullPage) {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless
  });

  const page = await browser.newPage();
  await page.goto(url);
  await page.evaluate(() => (document.body.style.background = 'transparent'));
  await page.waitFor(1500);
  const file = await page.screenshot({ type, quality, fullPage });
  await browser.close();
  return file;
}

module.exports = { getScreenshot };
