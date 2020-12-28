const followCount=require("./pageComponents")
module.exports.goToUser=async (page,talker)=>{
await page.goto('https://instagram.com/'+talker, { waitUntil: 'networkidle2' });
await page.waitForSelector("#react-root > section > footer > div > div.Igw0E.IwRSH.YBx95.ybXk5._4EzTm._22l1._49XvD > div.Igw0E.IwRSH.eGOV_._4EzTm._5VUwz > div").catch(e=>console.log("not"))
}
