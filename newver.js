const puppeteer = require("puppeteer");
const credentials = require("./credentials");
const subs = require("./suvscribers");
const sc = require("./sc");
let count = 0;
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

    await page.evaluate(() => {
      document
        .querySelector(
          "div.Igw0E.IwRSH.eGOV_._4EzTm.bkEs3.CovQj.jKUp7.DhRcB button"
        )
        .click();
    });
  }
  await page.waitFor(4000);
  debugger;
  sessioncookies = await page.cookies();
  console.log(JSON.stringify(sessioncookies));
  for (let i = 418; i < subs.current.length; i++) {
    if (subs.na_kogo_podpisalsya_nozhi.indexOf(subs.current[i]) < 0) {
      try {
        await page.goto("https://instagram.com/" + subs.current[i]);
      } catch (error) {
        await page.waitFor(4000);
      }

      await page.waitFor(4000);
      const subscribebutton = await page.$x(
        "//button[contains(text(), 'Подписаться')]"
      );

      if (subscribebutton.length > 0) {
        await subscribebutton[0].click();
        count++;
        console.log(
          "Подписано: " +
            count +
            "   " +
            subs.current[i] +
            "   " +
            i +
            "   " +
            "  " +
            "a[href='/" +
            subs.current[i] +
            "/followers/'] span"
        );
        await page.waitFor(60000);
      } else {
        console.log("Рассмотрен: " + i + "  " + subs.current[i]);
      }
    }
    await page.waitFor(2000);
  }
})();
