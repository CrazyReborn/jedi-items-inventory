const Category = require('../models/category');
const Item = require('../models/item');
const async = require('async');
const {body, validationResult} = require('express-validator');

exports.index = function(req, res, next) {
    async.parallel({
        categories: function(callback) {
            Category.find().populate('name').exec(callback)
        },
        items: function(callback) {
            Item.find().populate('name').exec(callback);
        }
    }, function(err, results) {
        res.render('index', {title: 'Catalog Categories', error: err, categories: results.categories, items: results.items});
    })
};

exports.category_view_get = function(req, res, next) {
    async.parallel({
        category: function(callback) {
            Category.findById(req.params.id).exec(callback);
        },
        items: function (callback) {
            Item.find({category: req.params.id}).exec(callback);
        }
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.render('category_detail', {title: 'Category Detail', category: results.category, items: results.items});
    })
}

exports.category_list = function(req, res, next) {
    Category.find()
    .exec(function (err, results) {
        if (err) {
            return next(err);
        }
        res.render('category_list', {title: 'Category List', categories: results});
    });
};

exports.category_create_get =   function (req, res, next) {
    res.render('category_form', {title: 'Create Category'});
};

exports.category_create_post = [
        body('name', 'Category name must not be empty.').trim().isLength({min: 1}).escape(),
        body('description', 'Description must not be empty').trim().isLength({min: 1}).escape(),
    
        (req, res, next) => {
            const errors = validationResult(req);
    
            let category = new Category({
                name: req.body.name,
                description: req.body.description
            });
            if (!errors.isEmpty()) {
                res.render('category_form', {tite: 'Create Category', category: category, errors: errors.array()});
                return;
            }
            else {
                Category.findOne({name: req.body.name})
                .exec(function (err, found_category) {
                    if (err) {
                        return next(err);
                    }
                    if (found_category) {
                        res.redirect(found_category.url);
                    }
                    else {
                        category.save(function(err) {
                            if (err) {
                                return next(err);
                            }
                            res.redirect(category.url);
                        })
                    }
                })
            }
        }
]

exports.category_delete_get = function(req, res, next) {
    res.send('inplement category delete get');
};

exports.category_delete_post = function(req, res, next) {
    res.send('inplement category delete post');
};

exports.category_update_get = function(req, res, next) {
    res.send('inplement category update get');
};

exports.category_update_post = function(req, res, next) {
    res.send('inplement category update post');
};