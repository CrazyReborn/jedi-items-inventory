const Category = require('../models/category');
const Item = require('../models/item');
const async = require('async');

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

exports.category_create_get = function(req, res, next) {
    res.send('inplement category create get');
};

exports.category_create_post = function(req, res, next) {
    res.send('inplement category create post');
};

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