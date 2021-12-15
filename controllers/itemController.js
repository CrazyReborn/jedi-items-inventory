const Item = require('../models/item');
const Category = require('../models/category');
const async = require('async');

exports.item_list = function(req, res, next) {
    Item.find().exec(function (err, results) {
        if (err) {
            return next(err);
        }
        res.render('item_list', {title: 'Item List', items: results});
    })
}

exports.item_view_get = function(req, res, next) {
    Item.findById(req.params.id)
    .populate('category')
    .exec(function (err, item) {
        if (err) {
            return next(err);
        }
        res.render('item_detail', {title: 'Item detail', item: item});
    })
}

exports.item_create_get = function(req, res, next) {
};

exports.item_create_post = function(req, res, next) {
    res.send('inplement item create post');
};

exports.item_delete_get = function(req, res, next) {
    res.send('inplement item delete get');
};

exports.item_delete_post = function(req, res, next) {
    res.send('inplement item delete post');
};

exports.item_update_get = function(req, res, next) {
    res.send('inplement item update get');
};

exports.item_update_post = function(req, res, next) {
    res.send('inplement item update post');
};