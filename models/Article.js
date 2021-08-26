const Sequelize = require('sequelize');
const connection = require('../database/Database');
const Category = require('./Category');

const Article = connection.define('aticles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false   
    },
    slug: { //nome para usar na rota
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article);
Article.belongsTo(Category);

Article.sync({force: false});

module.exports = Article;