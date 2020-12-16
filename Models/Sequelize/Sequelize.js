const Sequelize = require("sequelize");
const env=require("../../env")
module.exports.sequelize = new Sequelize(env.env.dbname, env.env.user, env.env.password, {
    dialect: "mysql",
    host: env.env.host,
    define: {
        timestamps: false
    }
});