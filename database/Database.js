const Sequelize = require('sequelize');

const connection = new Sequelize("crud_node", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;