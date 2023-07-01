import { Browser, chromium, Page, test } from "@playwright/test";

let browser: Browser;
let page: Page;

test.beforeAll(async () => {
  browser = await chromium.launch({
    devtools: true,
    headless: false,
  });
});

test.afterAll(async () => {
  await browser.close();
});

test.beforeEach(async () => {
  page = await browser.newPage();

  await page.goto(`https://vinhyuki95.github.io/myPortfolio`, {
    waitUntil: "load",
  });
});

test.afterEach(async () => {
  await page.close();
});

test("clicks Github button, redirects to Github", async () => {});
