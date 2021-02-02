const sequelize = require("./Sequelize/Sequelize")
const Sequelize = require("sequelize");
module.exports.lastAccaunt = sequelize.sequelize.define("lastaccaunt", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
});
sequelize.sequelize.sync().then(result=>console.log("last accaunts synchronized"))