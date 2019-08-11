const puppeteer = require("puppeteer");
const credentials = require("./credentials");
const subs = require("./suvscribers");
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--window-size=1400,880"],
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();
  page.setViewport({ height: 880, width: 1400 });
  await page.goto("https://instagram.com/accounts/login");
  await page.waitFor(() => document.querySelectorAll("input").length);
  await page.type("[name=username]", credentials.username);
  await page.type("[name=password]", credentials.password);

  await page.evaluate(() => {
    document
      .querySelector(
        "div.Igw0E.IwRSH.eGOV_._4EzTm.bkEs3.CovQj.jKUp7.DhRcB button"
      )
      .click();
  });
  await page.waitFor(4000);
  for (let i = 0; i < subs.na_kogo_podpisalsya_nozhi.length; i++) {
    await page.goto(
      "https://instagram.com/" + subs.na_kogo_podpisalsya_nozhi[i]
    );
    let sbut = await page.$x('//button[contains(text(),"Подписаться")]');
    await page.waitFor(4000);
    if ((await page.$("button._5f5mN")) !== null) {
      let subscrbutton = await page.evaluate(() =>
        Array.from(document.querySelectorAll("button._5f5mN"), e => e.innerText)
      );
      for (let s = 0; s < subscrbutton.length; s++) {
        let n = subscrbutton[s];
        if (n == "Подписаться") {
          //  await page.waitForSelector("button.BY3EC");
          //  await page.click("button.BY3EC");
          await sbut[0].click();
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
        } else {
          console.log(n);
        }
      }
    }
  }
})();
