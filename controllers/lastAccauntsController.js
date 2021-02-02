const lastAccaunt=require("../Models/lastAccaunts")
const sequelize=require("../Models/Sequelize/Sequelize")
const create=(name,date)=>{
    lastAccaunt.lastAccaunt.create({name,date}).then(r=>console.log(name+"   added to lastaccaunts"))
}
const get=async()=>{
    let list=await lastAccaunt.lastAccaunt.findAll()
    console.log(list)
    return JSON.stringify(list)
}
const del=async(accname)=>{
  let accaunt=await lastAccaunt.lastAccaunt.destroy({
      where:{
          date:accname
      }
  })

    }
module.exports.lastAccauntController={
    create,
    get,
    del
}