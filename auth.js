const { env } = require('./env');
module.exports.auth={
   async login(page){
        await page.goto('https://instagram.com/', { waitUntil: 'networkidle2' });
    await page.type("#loginForm > div > div:nth-child(1) > div > label > input",env.login,{delay:200})
    await page.type("#loginForm > div > div:nth-child(2) > div > label > input", env.password, { delay: 200 })
    let submitButton = await page.$('#loginForm > div > div:nth-child(3) > button')
    submitButton.click()
    }
}