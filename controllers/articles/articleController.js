const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');
const Article = require('../../models/Article');
const slugify = require('slugify');

router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then((articles) => {
        res.render("admin/articles", {articles: articles}); 
     });
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then((categories) => {
       res.render("admin/articles/new", {categories: categories}); 
    });
    
});

router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("/admin/articles");
    }
    Article.findByPk(id).then((article) => {
        if(article != undefined){
            Category.findAll().then((categories) => {
                res.render("admin/articles/edit", {article: article, categories: categories});
             });  
        }else{
            res.redirect("/admin/articles");
        }
    }).catch((err) => {
        res.redirect("/admin/articles");
        console.log(err);
    })
})

router.post('/articles/update', (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var categoryId = req.body.categoryId;
    Article.update({title: title, slug: slugify(title), body: body, categoryId: categoryId}, {where: {id: id}}).then(() => {
        res.redirect("/admin/articles");
    }).catch(err => {
        res.redirect("/");
    });
});

router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where: {id: id},
            }).then(() => {
                res.redirect("/admin/articles");
            });
        }else{
            res.redirect("/admin/articles?erro");
        }
    }else{
        res.redirect("/admin/articles?erro");
    }
})

router.post("/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;
    if(title!=undefined) {
        Article.create({
            title: title,    
            slug: slugify(title),
            body: body,
            categoryId: category
        }).then(() => {
            res.redirect('/admin/articles');
        });
    }else{
        res.rendirect("/admin/articles/new");
    }
})

router.get('/articles/page/:number', (req, res) => {
    var page = parseInt(req.params.number);
    var offset = 0;
    if(!isNaN(page) || page <= 1){
        offset = 0;
    }
    if(page > 1){
        offset = ((page - 1)*4);
    }
    Article.findAndCountAll({
        limit: 4,
        order: [
            ['id','DESC']
        ], 
        offset: offset
    }).then((articles) => {
        var next;
        if((offset + 4) >= articles.count){
            next = false;
        }else{
            next = true;
        }
        var results = {
            next: next,
            page: page,
            articles: articles
        }

        //res.json(results);

        Category.findAll().then((categories) => {
            res.render("admin/articles/page", {results: results, categories: categories});
         });  
    })
});


module.exports = router;