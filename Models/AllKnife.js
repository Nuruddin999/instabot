const sequelize = require("./Sequelize/Sequelize")
const Sequelize = require("sequelize");
module.exports.activetalker = sequelize.sequelize.define("activetalker", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    }
});