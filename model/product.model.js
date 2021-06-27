const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    nameProduct:{type: String},
    description: {type: String},
    price: {type: Number},
    seller: {type: String},
    sellerName: {type: String},
    category: {type: String},
    img_thumb: {type: String},
    type: {type: String}
},{
    timestamps: true,
});

module.exports = mongoose.model('Product',Product);