const activetalker=require("./Models/AllKnife")
const goToUser=require("./goToUser")
const followCount=require("./pageComponents")
const fs = require('fs').promises;
const isForSubs=(followed,following)=>{
    let more1kFollowers=followed.includes("тыс")
    let more500Followers=Number(followed.replace(/\s+/g, ''))>500
    let more1kFol=following.includes("тыс")
    let more500Fol=Number(following.replace(/\s+/g, ''))>500
    return !(more1kFollowers || more500Followers) && !(more1kFol || more500Fol)
 }
 const pressFollow=async(page,followersCount,followingCount,user)=>{
     const [button] = await page.$x("//button[contains(., 'Подписаться')]");
  if(isForSubs(followersCount,followingCount) && button){ 
            await button.click();
        await  page.waitForTimeout(60000)
    }  
    else {
        await  page.waitForTimeout(2000)
    }
    await fs.writeFile('./lastsubscribedIndex.txt',user);
}
const subscr=async(page,user)=>{
    let following=await page.$(`${followCount.page.followingCount}`).catch(e=>console.log("Ошибка"))
    let followers=await page.$(`${followCount.page.followedCount}`)
    let followersPrivate=await page.$(`${followCount.page.followedCountPrivate}`).catch(e=>console.log("Ошибка")) 
    let followingPrivate=await page.$(`${followCount.page.followingCountPrivate}`).catch(e=>console.log("Ошибка"))
    if(following){
        let followersCount=await page.evaluate(el=>el.innerText,followers)
        let followingCount=await page.evaluate(el=>el.innerText,following)
await pressFollow(page,followersCount,followingCount,user)   
    }
    else if(followingPrivate) {
         let followingCount=await page.evaluate(el=>el.innerText,followingPrivate)
         let followersCount=await page.evaluate(el=>el.innerText,followersPrivate ? followersPrivate:followers)
         await pressFollow(page,followersCount,followingCount,user)     
    }
}
const lastIndex=async(list)=>{
    const userIndex = await fs.readFile('lastsubscribedIndex.txt',{encoding:"utf-8"});
    let currentindex
    if (userIndex==="") {
      currentindex=0
    }
    else { 
      currentindex=list.indexOf(userIndex)
     }
     return currentindex
}
module.exports.subscribe=async(page)=>{
    let activeTalkers=await  activetalker.activetalker.findAll().catch(e=>console.log("error on server"))
    let uniqueList=[]
    for (let index =0; index < activeTalkers.length; index++) {
        if(uniqueList.indexOf(activeTalkers[index].name)<0){
            uniqueList.push(activeTalkers[index].name)
        }
       }
       let currentIndex=await lastIndex(uniqueList)
    for (let index =currentIndex; index < uniqueList.length; index++) {
        console.log(index+"/"+uniqueList.length)
       if(200-index===0){await page.waitForTimeout(40000)}
        await goToUser.goToUser(page,uniqueList[index])
        await subscr(page,uniqueList[index])
        if(index===uniqueList.length-1){
            console.log("all")
        }
       }
}