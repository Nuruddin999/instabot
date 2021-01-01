const activeTalker=require("./Models/AllKnife")
const sequelize=require("./Models/Sequelize/Sequelize")
module.exports = {
  async addTalker(page,c,sourceAccaunt,io){
    let result= await this.getName(page,c)
    if(result===sourceAccaunt){ return }
    await activeTalker.activetalker.sync()
    let findOrCreateResult=await activeTalker.activetalker.findOrCreate({  where: {
      name: result
    },
    defaults: { // set the default properties if it doesn't exist
      name: ""
    }})
    let user= findOrCreateResult[0], // the instance of the author
 created = findOrCreateResult[1]; // boolean stating if it was created or not
  if (!created) { // false if author already exists and was not created.
    io.sockets.emit('already exists',"user already exists");
  }
  else {
    io.sockets.emit('added',user.name);
  }
   
  },
  async getName(page, c) {
    let value = await page.evaluate(el => el.textContent, c)
    return value
  },
  async getCommentators(page,sourceAccaunt,io) {
    sequelize.sequelize.sync().then(result=>{
      console.log("synchronized");
    })
    .catch(err=> console.log("error in db sync  "+err));
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
    await page.goto(`https://instagram.com/${sourceAccaunt}`, { waitUntil: 'networkidle2' });
    await page.click("#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1) > a")
    await page.waitForTimeout(2000)
     setInterval(() => this.getCommentators(page,sourceAccaunt,io), 10000) 
  }
}