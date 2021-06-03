const cartModel = require('../model/cart.model')
module.exports={
    getCart: async(req,res)=>{
        console.log(cartModel.addCart());
        console.log("xem data\n",await cartModel.showCart());
        console.log("update: ", await cartModel.updateCart());
        res.render("vwCart/Cart")
    },
    setCart: async(req,res)=>{
        res.send("OK")
    },
    // updateCart: async

}