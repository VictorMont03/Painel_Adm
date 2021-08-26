const Sequelize = require('sequelize');
const connection = require('../database/Database');

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false   
    },
    slug: { //nome para usar na rota
        type: Sequelize.STRING,
        allowNull: false
    }
})

Category.sync({force: false});

module.exports = Category;