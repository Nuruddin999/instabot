const followCount=require("./pageComponents")
module.exports.goToUser=async (page,talker)=>{
await page.goto('https://instagram.com/'+talker, { waitUntil: 'networkidle2' });
await page.waitForSelector(followCount.page.followedCount)
await  page.waitForTimeout(30000)
}
