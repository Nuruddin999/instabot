const activeTalker=require("./Models/AllKnife")
const sequelize=require("./Models/Sequelize/Sequelize")
module.exports = {
  async addTalker(page,c){
    let result= await this.getName(page,c)
    let talker=await  activeTalker.activetalker.findOne({ where: { name: result } })
    if (talker){
   let addedToDb= await activeTalker.activetalker.create({
        name: r,
      })
    }
  },
  async getName(page, c) {
    let value = await page.evaluate(el => el.textContent, c)
    return value
  },
  async getCommentators(page, list) {
    sequelize.sequelize.sync().then(result=>{
      console.log(result);
    })
    .catch(err=> console.log(err));
   let commnetators = await page.$$("a.sqdOP.yWX7d._8A5w5.ZIAjV")
    commnetators.forEach(c => {
      this.getName(page, c).then(r => {
        activeTalker.activetalker.findOne({ where: { name: r } }).then(user=>{
          if (user===null){
          activeTalker.activetalker.create({
            name: r,
          }).then(res=>{
            console.log(res);
          }).catch(err=>console.log(err))
        }
      })
      
      })
    })
    let nextBtn = await page.$("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow")
    if (nextBtn) {
      await page.click("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow")
    }
    else { await page.click("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a") }
    console.log(list)
  },
 async pickTalkers(page){
    await page.goto('https://instagram.com/eldarr_g', { waitUntil: 'networkidle2' });
    await page.click("#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1) > a")
    await page.waitForTimeout(2000)
     setInterval(() => this.getCommentators(page), 10000) 
  }
}