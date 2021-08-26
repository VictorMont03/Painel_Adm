const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');

router.get("/artigos", (req, res) => {
    res.send("Artigos");
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then((categories) => {
       res.render("admin/articles/new", {categories: categories}); 
    });
    
});

module.exports = router;