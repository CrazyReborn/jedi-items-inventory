#! /usr/bin/env node

console.log('This script populates some caterogies and items');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Item = require('./models/item')
var Category = require('./models/category')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var categories = [];
var items = [];

function categoryCreate(name, description, cb) {
  
  categorydetail = {name, description};
  
  var category = new Category(categorydetail);
       
  category.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Category: ' + category);
    categories.push(category);
    cb(null, category);
  });
}

function itemCreate(name, description, price, quantity, category, cb) {
  itemdetail = { 
    name,
    description,
    price,
    quantity,
    category: category
  }

    
  var item = new Item(itemdetail);    
  item.save(function (err) {
    if (err) {
      cb(err, null);
      return
    }
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item)
  });
};

function createCategories(cb) {
    async.series([
        function(callback) {
          categoryCreate('Robes', 'Loose-fitting outer garments. They cover(ed) most of the (unfortunate) wearer\'s body.', callback);
        },
        function(callback) {
          categoryCreate('Utilities', 'Various equipment for your new utility belt', callback);
        },
        function(callback) {
          categoryCreate('Holocrons', 'Collection of sources to learn about our Galaxy\'s and Jedi\'s history', callback);
        },
        function(callback) {
          categoryCreate('Lightsabers', 'Choose a new addition to your fine collection', callback);
        }
        ],
        cb);
};

function createItems(cb) {
    async.series([
        function(callback) {
          itemCreate('Lightsaber with green color crystal', 
          'Jedi Lightsaber with green blade. Working condition. Previous owner is unknown. Electrum encusted.', 
          1700, 1, categories[3], callback);
        },
        function(callback) {
          itemCreate('Lightsaber with red color crystal', 
          'Jedi Lightsaber with red blade. Working condition. Has several marks. Previous owner is unknown.', 
          1700, 1, categories[3], callback)
        },
        function(callback) {
          itemCreate('White Jedi robe', 
          'Jedi Robe made of white material. Has several holes in the chest region.', 
          600, 3, categories[0], callback)
        },
        function(callback) {
          itemCreate('Hush-98 comlink', 
          'A comlink used by a Jedi Master model Hush-98. Ideal condition. Modified to have a memory device. More information will be providied to a potentional buyer.', 
          2000, 1, categories[1], callback)
        },
        function(callback) {
          itemCreate('Holocron. Unknown contents.', 
          'Jedi holocron retrived from a Jedi temple. Were unable to get any information from it.', 
          4500, 3, categories[2], callback)
        }
        ],
        // optional callback
        cb);
}



async.series([
  createCategories,
  createItems
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
      console.log('done');
  }
    // All done, disconnect from database
    mongoose.connection.close();
});




