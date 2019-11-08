const puppeteer = require("puppeteer");
const credentials = require("./credentials");
const subs = require("./suvscribers");
const masslooklist = require("./masslooklist.js");
const sc = require("./sc");
let sessioncookies;
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--window-size=1400,880"],
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();
  page.setViewport({ height: 880, width: 1400 });

  if (sc.sc) {
    await page.setCookie(...sc.sc);
    await page.goto("https://instagram.com/");
  } else {
    const context = browser.defaultBrowserContext();
    await context.overridePermissions("https://instagram.com/accounts/login", [
      "geolocation"
    ]);
    try {
      await page.goto("https://instagram.com/accounts/login");
    } catch {
      await page.waitFor(4000);
    }

    await page.waitFor(() => document.querySelectorAll("input").length);
    await page.setGeolocation({ latitude: 47.504682, longitude: 42.980854 });
    await page.type("[name=username]", credentials.usernamenozhi);
    await page.type("[name=password]", credentials.passwordnozhi);
    // debugger;
    await page.evaluate(() => {
      document
        .querySelector(
          "div.Igw0E.IwRSH.eGOV_._4EzTm.bkEs3.CovQj.jKUp7.DhRcB button"
        )
        .click();
    });
  }
  await page.waitFor(4000);
  let count = 0;
  for (let i = 535; i < subs.current.length; i++) {
    try {
      await page.goto("https://instagram.com/" + subs.current[i]);
    } catch (error) {
      await page.waitFor(4000);
    }
    await page.waitFor(3000);
    console.log(" profile  looked" + " " + i);
    let story = await page.$("div.RR-M-");
    if (story !== null) {
      story.click();
      await page.waitFor(1500);
    }
    let story_container = await page.$("div.GHEPc");
    if (story_container !== null) {
      await page.waitFor(15000);
      count++;
      console.log(" story looked" + story.click() + " " + count);
    }
    await page.waitFor(1500);
  }
})();
