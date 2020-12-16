const activeTalker=require("./Models/AllKnife")
const sequelize=require("./Models/Sequelize/Sequelize")
module.exports = {
  async getName(page, c) {
    let value = await page.evaluate(el => el.textContent, c)
    return value
  },
  async getCommentators(page, list) {
    sequelize.sync().then(result=>{
      console.log(result);
    })
    .catch(err=> console.log(err));
   let commnetators = await page.$$("a.sqdOP.yWX7d._8A5w5.ZIAjV")
    commnetators.forEach(c => {
      this.getName(page, c).then(r => list.indexOf(r) < 0 ? sequelize.sequelize.sync().then(() => 
      activeTalker.allnozhi.create({
        name: r,
      }).then(res=>{
        console.log(res);
      }).catch(err=>console.log(err))
)  : r)
    })
    let nextBtn = await page.$("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow")
    if (nextBtn) {
      await page.click("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow")
    }
    else { await page.click("body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a") }
    console.log(list)
  }

}