const puppeteer = require('puppeteer');
const { env } = require('./env');
const fs = require('fs').promises;
const activeTalker=require("./Models/AllKnife")
const auth=require("./auth")
const getCommentators=require("./getCommentators")
const getName = async (page, c) => {
  let value = await page.evaluate(el => el.textContent, c)
  return value
}
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const cookiesString = await fs.readFile('./ckis.json');
const cookies = JSON.parse(cookiesString);
  if(cookies.length>0){
      await page.setCookie(...cookies);
  await page.setViewport({
    width: 1280,
    height: 768,
    deviceScaleFactor: 1,
  });
  await page.goto('https://instagram.com', { waitUntil: 'networkidle2' });
  await page.click("body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.HoLwm")
  await page.goto('https://instagram.com/eldarr_g', { waitUntil: 'networkidle2' });
  await page.click("#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1) > a")
  await page.waitForTimeout(2000)
  let commnetators = await page.$$("a.sqdOP.yWX7d._8A5w5.ZIAjV")
let users=await activeTalker.activetalker.findAll({raw:true}).catch(err=>console.log(err));
  // setInterval(() => getCommentators.getCommentators(page,users), 10000)
console.log(users)  
}
  else 
  {
   await auth.auth.login(page)
    const cookies = await page.cookies();
    await fs.writeFile('./ckis.json', JSON.stringify(cookies, null, 2));
  }
})();