const puppeteer = require("puppeteer");
const credentials = require("./credentials");
const subs = require("./suvscribers");
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
  debugger;
  sessioncookies = await page.cookies();
  console.log(JSON.stringify(sessioncookies));
  for (let i = 1532; i < subs.current.length; i++) {
    if (subs.na_kogo_podpisalsya_nozhi.indexOf(subs.current[i]) < 0) {
      try {
        await page.goto("https://instagram.com/" + subs.current[i]);
      } catch (error) {
        await page.waitFor(4000);
      }

      let sbut = await page.$x('//button[contains(text(),"Подписаться")]');
      await page.waitFor(4000);

      if ((await page.$("button._5f5mN")) !== null) {
        let subscrbutton = await page.evaluate(() =>
          Array.from(
            document.querySelectorAll("button._5f5mN"),
            e => e.innerText
          )
        );
        for (let s = 0; s < subscrbutton.length; s++) {
          let n = subscrbutton[s];
          if (n == "Подписаться") {
            //  await page.waitForSelector("button._5f5mN");
            //  await page.click("button.BY3EC");
            await sbut[0].click();
            await page.waitFor(2000);

            console.log("Подписан" + "  " + subs.current[i] + "  " + i);
            // let currentstatus = await page.$x(
            //   '//button[contains(text(),"Подписаться")]'
            // );
            // if (currentstatus[0] !== null) {
            //   console.log("Надо сделать паузу");
            //   await page.waitFor(300000);
            // } else {
            //   console.clear();
            //   console.log(
            //     "Подписан" + "  " + subs.na_kogo_podpisalsya_nozhi[i] + "  " + i
            //   );
            // }
          } else {
            console.log(n + " " + i);
          }
        }
      }
      if ((await page.$("button.BY3EC")) !== null) {
        console.log("private");
        let subscrbutton = await page.evaluate(() =>
          Array.from(
            document.querySelectorAll("button.BY3EC"),
            e => e.innerText
          )
        );
        for (let s = 0; s < subscrbutton.length; s++) {
          let n = subscrbutton[s];
          if (n == "Подписаться") {
            await sbut[0].click();

            console.log("Подписан" + "  " + subs.current[i] + "  " + i);
          } else {
            console.log(n + "  " + i);
          }
        }
      }
      let subscrbutton = await page.evaluate(() =>
        Array.from(document.querySelectorAll("button._5f5mN"), e => e.innerText)
      );
      for (let s = 0; s < subscrbutton.length; s++) {
        let n = subscrbutton[s];
        if (n == "Подписаться") {
          console.log("Надо сделать паузу");
        }
      }
      let subscrbuttonprivate = await page.evaluate(() =>
        Array.from(document.querySelectorAll("button.BY3EC"), e => e.innerText)
      );
      for (let s = 0; s < subscrbuttonprivate.length; s++) {
        let n = subscrbutton[s];
        if (n == "Подписаться") {
          console.log("Надо сделать паузу");
        }
      }
      await page.waitFor(60000);
    }
  }
})();
