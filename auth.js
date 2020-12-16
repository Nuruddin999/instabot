
const phoneCode=require("./phoneCode.json")
const { env } = require('./env');
const fs = require('fs')
module.exports.auth={
   async login(page){
        await page.goto('https://instagram.com/', { waitUntil: 'networkidle2' });
    await page.type("#loginForm > div > div:nth-child(1) > div > label > input",env.login,{delay:200})
    await page.type("#loginForm > div > div:nth-child(2) > div > label > input", env.password, { delay: 200 })
    let submitButton = await page.$('#loginForm > div > div:nth-child(3) > button')
    submitButton.click()
  await  page.waitForTimeout(30000)
    let rawdata = fs.readFileSync('phoneCode.json');
let phoneCode = JSON.parse(rawdata);
await page.type("#react-root > section > main > div > div > div:nth-child(1) > div > form > div.gi2oZ > div > label > input",phoneCode.phone,{delay:200})
await page.waitForSelector('#react-root > section > main > div > div > div:nth-child(1) > div > form > div.Igw0E.IwRSH.eGOV_._4EzTm.MGdpg.CovQj.jKUp7.iHqQ7 > button')
let confirmButton=await page.$('#react-root > section > main > div > div > div:nth-child(1) > div > form > div.Igw0E.IwRSH.eGOV_._4EzTm.MGdpg.CovQj.jKUp7.iHqQ7 > button')
confirmButton.click()
await page.waitForSelector('#react-root > section > main > div > div > div > section > div > button')
let saveCredentialsButton=await page.$('#react-root > section > main > div > div > div > section > div > button')
saveCredentialsButton.click()
    }
}