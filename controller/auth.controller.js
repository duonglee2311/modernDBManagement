// const cartModel = require('../model/cart.model')
module.exports={
    login: async(req,res)=>{
        res.render("vwAuth/Login");
    },
    sign_up: async(req, res) =>{
        res.render("vwAuth/SignUp");
    },
    find_pass: async(req, res) =>{
        res.render("vwAuth/FindPass");
    }
}