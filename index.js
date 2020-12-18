const puppeteer = require('puppeteer');
const { env } = require('./env');
const fs = require('fs').promises;
const activeTalker=require("./Models/AllKnife")
const allknives=require("./Models/AllNozhi")
const auth=require("./auth")
const getCommentators=require("./getCommentators")
const unsubscribe=require("./unSubscribe")
const goToUser=require("./goToUser")
const getName = async (page, c) => {
  let value = await page.evaluate(el => el.textContent, c)
  return value
}
const subscribeTalker=async(page,talker)=>{
goToUser.goToUser(page,talker)
  let subscribersSpan=await page.$("#react-root > section > main > div > header > section > ul > li:nth-child(2) > a > span")
let subsCount=await page.evaluate(el=>el.innerText,subscribersSpan)
if(subsCount.includes("тыс")){return}
if(Number(subsCount.replace(/\s+/g, ''))<500){
  console.log(Number(subsCount.replace(/\s+/g, '')))
}
const subscribeTalkerWrapper=async()=>{
  let talkers= await activeTalker.activetalker.findAll()
  for (let index = 0; index < talkers.length; index++) {
   await subscribeTalker(page,talkers[index].name)
  }
}
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
  let allknifeusers=await allknives.allnozhi.findAll()
  for (let index = 0; index < allknifeusers.length; index++) {
    await goToUser.goToUser(page,allknifeusers[index].name)
  await unsubscribe.unsubscribe(page)
    break
   }
  
}
  else 
  {
   await auth.auth.login(page)
    const cookies = await page.cookies();
    await fs.writeFile('./ckis.json', JSON.stringify(cookies, null, 2));
  }
})();