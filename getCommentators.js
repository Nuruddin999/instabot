const activeTalker=require("./Models/AllKnife")
const sequelize=require("./Models/Sequelize/Sequelize")
module.exports = {
  async addTalker(page,c,sourceAccaunt){
    let result= await this.getName(page,c)
    if(result===sourceAccaunt){ return }
    console.log("getname: " + result)
    let talker=await  activeTalker.activetalker.findOne({ where: { name: result } })
    if (!talker){
 await activeTalker.activetalker.create({
        name: result,
      })
    }
    console.log("added: " + result)
  },
  async getName(page, c) {
    let value = await page.evaluate(el => el.textContent, c)
    return value
  },
  async getCommentators(page,sourceAccaunt) {
    sequelize.sequelize.sync().then(result=>{
      console.log("synchronized");
    })
    .catch(err=> console.log("error in db sync  "+err));
   let commnetators = await page.$$("a.sqdOP.yWX7d._8A5w5.ZIAjV")
    commnetators.forEach(c => {
       this.addTalker(page,c,sourceAccaunt)
    })
    let nextBtn = await page.$("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow")
    if (nextBtn) {
      await page.click("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow")
    }
    else { await page.click("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a") }
  },
 async pickTalkers(page,sourceAccaunt){
    await page.goto(`https://instagram.com/${sourceAccaunt}`, { waitUntil: 'networkidle2' });
    await page.click("#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1) > a")
    await page.waitForTimeout(2000)
     setInterval(() => this.getCommentators(page,sourceAccaunt), 10000) 
  }
}