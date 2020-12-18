const sequelize = require("./Sequelize/Sequelize")
const Sequelize = require("sequelize");
module.exports.allnozhi = sequelize.sequelize.define("allnozhi", {
    userid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});