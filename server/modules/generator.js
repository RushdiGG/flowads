var puppeteer = require("puppeteer");

exports.runGenerator = async (product, cb) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("/generator/canvas");

  await browser.close();
};
