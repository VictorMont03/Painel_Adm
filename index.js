//Express
const express = require('express');
const app = express();

//Views
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static('public'));


//Data
const connection = require('./database/Database');
const Article = require('./models/Article');
const Category = require('./models/Category');

app.use(express.urlencoded({ extended: true }));

const categoriesRoutes = require('./controllers/categories/categoriesController');
const articlesController = require('./controllers/articles/articleController');

connection.authenticate().then(() => {
    console.log('Database connect');
}).catch(err => {
    console.log(err.message);
})

app.use("/", categoriesRoutes);
app.use("/", articlesController);

app.get("/", (req, res) => {
    Article.findAll({order: [
        ['id','DESC']
    ]}).then((articles) => {
       res.render("index", {articles: articles}); 
    })
    
})

app.get(('/:slug'), (req, res) => {
    var slug = req.params.slug;
    Article.findOne(
        {where: {slug: slug}}
    ).then((article) => {
        if(article !== undefined){
            res.render('article', {article: article});
        }else{
            res.redirect('/');
        }   
    }).catch(err => {
        res.redirect('/');
    })
})

app.listen(8080, () => {
    console.log("Server on");
})