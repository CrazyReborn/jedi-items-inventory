const Item = require('../models/item');
const Category = require('../models/category');
const async = require('async');
const { body, validationResult } = require('express-validator');

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
    Category.find()
    .exec(function(err, categories) {
        if (err) {
            return next(err);
        }
        res.render('item_form', {title: 'Create Item', categories: categories});
    })
    
};

exports.item_create_post = [
    body('name', 'Category name must not be empty.').trim().isLength({min: 1}).escape(),
    body('description', 'Description must not be empty').trim().isLength({min: 1}).escape(),
    body('price', 'Price must not be empty.').optional({nullable: true}),
    body('quantity', 'Quantity must not be empty').optional({nullable: true}),

    (req, res, next) => {
        const errors = validationResult(req);

        let item = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category
        });
        if (!errors.isEmpty()) {
            res.render('item_form', {title: 'Create Item', errors: errors.array(), item: item});
            return;
        }
        else {
            Item.findOne({name: req.body.name, category: req.body.category})
            .exec(function (err, found_item) {
                if (err) {
                    return next(err);
                }
                if (found_item) {
                    res.redirect(found_item.url);
                }
                else {
                    item.save(function(err) {
                        if (err) {
                            return next(err);
                        }
                        res.redirect(item.url);
                    });
                }
            });
        }
    }
];

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