const followCount=require("./pageComponents")
const allknives=require("./Models/AllNozhi")
const goToUser=require("./goToUser")
const fs = require('fs').promises;
const blockUser=async(page)=>{
   await page.click(`${followCount.page.menuButton}`)
   await page.waitForSelector(`${followCount.page.blockUser}`)
   await page.click(`${followCount.page.blockUser}`)
   await page.waitForSelector(`${followCount.page.confirmBlockUser}`)
   await page.click(`${followCount.page.confirmBlockUser}`)
}
const isForBlock=(following)=>{
   let more1kFol=following.includes("тыс")
   let less500Fol=Number(following.replace(/\s+/g, ''))>500
   return more1kFol || less500Fol
}
const unsubscr=async(page,user)=>{
let following=await page.$(`${followCount.page.followingCount}`).catch(e=>console.log("Ошибка"))
let followingPrivate=await page.$(`${followCount.page.followingCountPrivatee}`).catch(e=>console.log("Ошибка"))
if(following){
    let followingCount=await page.evaluate(el=>el.innerText,following)
    console.log(followingCount)
   if(isForBlock(followingCount)){
    await blockUser(page)
    await fs.writeFile('./lastUnsubscribedIndex.txt',user);
 await  page.waitForTimeout(30000)
   }
   else {
      await page.waitForTimeout(2000)
   }
}
else if(followingPrivate){
    let followingCount=await page.evaluate(el=>el.innerText,followingPrivate)
    console.log(followingCount)
   if(isForBlock(followingCount)){
      await blockUser(page)
      await fs.writeFile('./lastUnsubscribedIndex.txt',user);
   await  page.waitForTimeout(30000)
     }
     else {
      await page.waitForTimeout(2000)
   }
}
}
module.exports.unsubscribe=async(page)=>{
   const userIndex = await fs.readFile('lastUnsubscribedIndex.txt',{encoding:"utf-8"});
   let allknifeusers=await allknives.allnozhi.findAll().catch(e=>console.log("error on server"))
   let currentindex
   if (userIndex==="") {
     currentindex=0
   }
   else { 
     currentindex=allknifeusers.findIndex(usr=>usr.name===userIndex)
    }
    for (let index =currentindex; index < allknifeusers.length; index++) {
      if(200-index===200){break}
      await goToUser.goToUser(page,allknifeusers[index].name)
      await unsubscr(page,allknifeusers[index].name)
     }
}