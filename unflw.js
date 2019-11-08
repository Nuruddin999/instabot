const puppeteer = require("puppeteer");
const credentials = require("./credentials");
const unflws = require("./suvscribers");
(async () => {
  let sessioncookies;
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--window-size=1400,880"],
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();
  page.setViewport({ height: 880, width: 1400 });
  const context = browser.defaultBrowserContext();
  await context.overridePermissions("https://instagram.com/accounts/login", [
    "geolocation"
  ]);
  if (sessioncookies) {
    await page.setCookie(...sessioncookies);
    await page.goto("https://instagram.com/");
  } else {
    await page.goto("https://instagram.com/accounts/login");
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

  for (let i = 0; i < subs.unflws.length; i++) {
    await page.goto("https://instagram.com/" + subs.unflws[i]);
    let sbut = await page.$x('//button[contains(text(),"Подписки")]');
    await page.waitFor(4000);
    sessioncookies = await page.cookies();
    if ((await page.$("button._5f5mN")) !== null) {
      let subscrbutton = await page.evaluate(() =>
        Array.from(document.querySelectorAll("button._5f5mN"), e => e.innerText)
      );
      for (let s = 0; s < subscrbutton.length; s++) {
        let n = subscrbutton[s];
        if (n == "Подписки") {
          //  await page.waitForSelector("button._5f5mN");
          //  await page.click("button.BY3EC");
          await sbut[0].click();
          await page.waitFor(2000);
          console.clear();
          console.log("Подписан" + "  " + subs.unflws[i] + "  " + i);
          debugger;
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
          console.log(n);
        }
      }
    }
    if ((await page.$("button.BY3EC")) !== null) {
      console.log("private");
      let subscrbutton = await page.evaluate(() =>
        Array.from(document.querySelectorAll("button.BY3EC"), e => e.innerText)
      );
      for (let s = 0; s < subscrbutton.length; s++) {
        let n = subscrbutton[s];
        if (n == "Подписаться") {
          await sbut[0].click();
          console.clear();
          console.log(
            "Подписан" + "  " + subs.na_kogo_podpisalsya_nozhi[i] + "  " + i
          );
        } else {
          console.log(n);
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
    await page.waitFor(6000);
  }
})();
