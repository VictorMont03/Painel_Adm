const Sequelize = require('sequelize');

const connection = new Sequelize("crud_node", "root", "", {
    host: "localhost",
    dialect: "mysql",
    timezone: "-03:00"
});

module.exports = connection;