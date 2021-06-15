const Product = require('../model/product.model');
const {mutipleMongooseToObject} = require('../utils/mongoose');
module.exports={
    homePage: async(req,res, next)=>{
        Product.find({})
            .then((products) => {
                res.render("homepage",{user: req.session.user, products: mutipleMongooseToObject(products)});
            })
            .catch(next);
        
    }
}