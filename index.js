const puppeteer = require("puppeteer");
const credentials = require("./credentials");
const alreadysubscribeon = [];

let myarray = [];
(async () => {
  const f = fs;
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--window-size=1400,880"],
    ignoreHTTPSErrors: true
  });
  const fs = require("fs");
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
  await page.goto("https://instagram.com/abu_suud");
  await page.waitFor(4000);
  await page.evaluate(() => {
    document.querySelector("div.v1Nh3 a").click();
  });
  await page.waitFor(2000);

  await page.evaluate(() => {
    setInterval(() => {
      let button = document.querySelectorAll(".FPmhX");
      arrow = document.querySelector(".coreSpriteRightPaginationArrow");
      button.forEach(btn => {
        if (btn.title.includes("suvenir_kavkaza")) {
        } else {
          console.log(coms.length);
          coms.push(btn.title);
          let unique = [...new Set(coms)];
          if (unique.length % 100 == 0) {
            var json = JSON.stringify(unique);
            f.writeFile("./myjsonfile.json", json, "utf8", function(err) {
              if (err) {
                console.log(err);
              } else {
                //Everything went OK!
                console.log(instagram.primarycommentators.length + "   " + k);
              }
            });
          }
        }
      });

      arrow.click();
    }, 3000);
  });
})();
