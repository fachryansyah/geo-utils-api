const utils = require("./utils");
const puppeteer = require("puppeteer-core");

module.exports = class GeoUtils {
  constructor({ executablePath, timeout }) {
    this.browser = null;
    this.page = null;
    this.timeout = timeout || 2000;
    this.executablePath = executablePath;
    this.baseUrl = "https://maps.google.com";
    this.viewPort = {
      width: 1080,
      height: 1024,
    };
  }

  async init() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        executablePath: this.executablePath,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-infobars",
          "--disable-notifications",
          "--window-position=0,0",
          "--ignore-certifcate-errors",
          "--ignore-certifcate-errors-spki-list",
          "--incognito",
        ],
      });
      this.page = await this.browser.newPage();
      await this.page.goto(this.baseUrl);
      await this.page.setViewport(this.viewPort);
    }
  }

  async stop() {
    await this.browser.close();
  }

  async geocodeAddresses(address) {
    await this.init();

    await this.page.waitForSelector('input[id="searchboxinput"]');

    const searchInput = await this.page.$('input[id="searchboxinput"]');
    await searchInput.type(address, { delay: 50 });

    await utils.sleep(this.timeout);

    const searchResult = await this.page.$$(
      'div[jsaction="suggestion.select"]'
    );
    await searchResult[0].click();

    await utils.sleep(this.timeout);

    const currentUrl = this.page.url();

    await searchInput.evaluate(input => input.value = '');

    return utils.parseUrl(currentUrl);
  }

  async autoComplete(query) {
    await this.init();

    await this.page.waitForSelector('input[id="searchboxinput"]');

    const searchInput = await this.page.$('input[id="searchboxinput"]');
    await searchInput.type(query, { delay: 50 });

    await utils.sleep(this.timeout);

    let sugesstions = [];
    const searchResult = await this.page.$$(
      'div[jsaction="suggestion.select"]'
    );
    await utils.asyncForEach(searchResult, async (item) => {
      const span = await item.$$("div > div > div > span");
      const name = await span[2].evaluate((el) => {
        const extract = el.querySelector("span > span");
        return extract ? extract.textContent : null;
      });
      const address = await span[3].evaluate((el) => {
        const extract = el.querySelector("span > span");
        return extract ? extract.textContent : null;
      });

      sugesstions.push({
        name,
        address,
      });
    });

    await searchInput.evaluate(input => input.value = '');

    return sugesstions;
  }
};
