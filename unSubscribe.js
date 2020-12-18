const followCount=require("./pageComponents")
module.exports.unsubscribe=async(page)=>{
let followers=await page.$(`${followCount.page.followedCount}`)
if(followers){
    let followersCount=await page.evaluate(el=>el.innerText,followers)
   if(followersCount.includes("тыс") || Number(followersCount.replace(/\s+/g, '')>500)){
await page.click(`${followCount.page.cancelFollow}`)
await page.waitForSelector(`${followCount.page.confirmUnfollow}`)
await page.click(`${followCount.page.confirmUnfollow}`)
   }
}
}