const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    idProduct: {type: String},
    idUser:{type: String},
    fullnameUser: {type: String},
    avatarUser: {type: String},
    comment: {type: String},
},{
    timestamps: true,
});

module.exports = mongoose.model('Comment',Comment);