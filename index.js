const puppeteer = require('puppeteer');
const { env } = require('./env');
const fs = require('fs').promises;
const sc = require("./cookies");
const auth=require("./auth")
const getName = async (page, c) => {
  let value = await page.evaluate(el => el.textContent, c)
  return value
}
const getCommnetators = async (page, list) => {
  let commnetators = await page.$$("a.sqdOP.yWX7d._8A5w5.ZIAjV")
  commnetators.forEach(c => {
    getName(page, c).then(r => list.indexOf(r) < 0 ? list.push(r) : r)
  })

  let nextBtn = await page.$("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow")
  if (nextBtn) {
    await page.click("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow")
  }
  else { await page.click("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a") }
}
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  if(sc.cks){
      await page.setCookie(...sc.cks);
  await page.setViewport({
    width: 1280,
    height: 768,
    deviceScaleFactor: 1,
  });
  await page.goto('https://instagram.com', { waitUntil: 'networkidle2' });
  await page.click("body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.HoLwm")
  await page.goto('https://instagram.com/eldarr_g', { waitUntil: 'networkidle2' });
  await page.click("#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1) > a")
  await page.waitFor(2000)
  let commnetators = await page.$$("a.sqdOP.yWX7d._8A5w5.ZIAjV")
  setInterval(() => getCommnetators(page), 10000)
  }
  else 
  {
    auth.auth.login(page)
    // await page.goto('https://instagram.com/', { waitUntil: 'networkidle2' });
    // await page.type("#loginForm > div > div:nth-child(1) > div > label > input",env.login,{delay:200})
    // await page.type("#loginForm > div > div:nth-child(2) > div > label > input", env.password, { delay: 200 })

  }






  /* await page.type("#loginForm > div > div:nth-child(2) > div > label > input", env.password, { delay: 200 })
   let submitButton = await page.$('#loginForm > div > div:nth-child(3) > button')
   const cookies = await page.cookies();
   console.log(cookies)
   await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));
   submitButton.click()*/
  //await page.type("#react-root > section > main > div > div > div:nth-child(2) > div > form > div.gi2oZ > div > label > input","")
})();