const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    image: String
});

ItemSchema.virtual('url').get(function() {
    return '/catalog/item/' + this._id;
});

module.exports = mongoose.model('Item', ItemSchema);