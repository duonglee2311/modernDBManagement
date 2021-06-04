// const cartModel = require('../model/cart.model')
module.exports={
    getUser: async(req,res)=>{
        res.render("vwUser/Index");
    },
    editUser: async(req, res) => {
        res.render('vwUser/Edit');
    }
}