const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Collection = new Schema({
    nameCollection: {type: String},
    productID: {type: String},
    listProduct: {type: Array},
    seller: {type: String},
    collectionThumb: {type: String},
    collectionDescription: {type: String},
},{
    timestamps: true,
});

module.exports = mongoose.model('Collection', Collection);