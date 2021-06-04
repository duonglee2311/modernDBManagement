// const cartModel = require('../model/cart.model')
module.exports={
    //GET: /product
    getProduct: async(req,res)=>{
        if(req.query.id != null){
            res.render("vwProduct/Product_detail")
        }
        else{ //GET: /product?id=1
            res.render("vwProduct/Product_client");
        }
    },
    //GET: /product/edit
    editProduct: async(req, res) => {
        if(req.query.id != null){
            res.render("vwProduct/Product_edit");
        }
        else{//GET: /product/edit?id=1
            res.render("vwProduct/Product_list_edit");
        }
    },
    
}