const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Event = require("./event")(sequelize, DataTypes);
db.User = require("./user")(sequelize, DataTypes);

module.exports = db;
