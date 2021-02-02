const activeTalker=require("./Models/AllKnife")
const sequelize=require("./Models/Sequelize/Sequelize")
module.exports = {
  async addTalker(page,c,sourceAccaunt,io){
    let result= await this.getName(page,c)
    if(result===sourceAccaunt){ return }
    let findOrCreateResult=await activeTalker.activetalker.findOrCreate({  where: {
      name: result
    },
 })
    let user= findOrCreateResult[0], // the instance of the author
 created = findOrCreateResult[1]; // boolean stating if it was created or not
  if (!created) { // false if author already exists and was not created.
    console.log("user created  ")
    io.sockets.emit('added',"user already exists");
  }
  else {
    console.log("user created  e"+user.name)
    io.sockets.emit('added',user.name);
  }
  io.sockets.on("stoppick",(result)=>console.log("picking stopped"))
  },
  async getName(page, c) {
    let value = await page.evaluate(el => el.textContent, c)
    return value
  },
  async getCommentators(page,sourceAccaunt,io) {
   let commnetators = await page.$$("a.sqdOP.yWX7d._8A5w5.ZIAjV")
    commnetators.forEach(c => {
       this.addTalker(page,c,sourceAccaunt,io)
    })
    let nextBtn = await page.$("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow")
    if (nextBtn) {
      await page.click("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow")
    }
    else { await page.click("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a") }
  },
 async pickTalkers(page,sourceAccaunt,io){
   let talkers=await activeTalker.activetalker.findAll()
   if(talkers.length>500){
     io.sockets.emit("picked","Комментаторы собраны")
   }
    await page.goto(`https://instagram.com/${sourceAccaunt}`, { waitUntil: 'networkidle2' });
    await page.click("#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1) > a")
    await page.waitForTimeout(2000)
     setInterval(() => this.getCommentators(page,sourceAccaunt,io), 10000) 
  }
}