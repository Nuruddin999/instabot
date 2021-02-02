const sequelize = require("./Sequelize/Sequelize")
const Sequelize = require("sequelize");
module.exports.knifefollowed = sequelize.sequelize.define("followed", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    }
},{
    freezeTableName: true,
    tableName: 'followed'});
sequelize.sequelize.sync().then(result=>console.log("knife followed synchronized"))