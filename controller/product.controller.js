// const cartModel = require('../model/cart.model')
module.exports={
    getProduct: async(req,res)=>{
        res.render("vwProduct/Product_client");
    },
    editProduct: async(req, res) => {
        res.render("vwProduct/Product_list_edit");
    },
    detailProduct: async(req, res) => {
        res.render("vwProduct/Product_edit");
    }
}