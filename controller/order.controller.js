const { async } = require('../model/order.model');
const orderModel = require('../model/order.model')
module.exports={
    //GET: /order/checkout
    getcheckout: async(req, res)=>{
        res.render("vwCart/Checkout");
    },
    setCheckout: async(req,res)=>{
        let userid=123;// lấy userID redis session
        console.log(req.body);
        // await orderModel.setOrder(userid,req.body);
        await orderModel.setOrder('123',req.body);
        res.redirect('/order');
    },
    //GET: /order
    getOrder: async(req,res)=>{
        if(req.query.id != null){
            
            res.render("vwOrder/Order_detail")
        }
        else{ //GET: /order?id=1
            let listOrder=await orderModel.getOrder(123,0);
            res.render("vwOrder/Order_buyer",{listOrder: listOrder});
        }
    },
    
    getOrderSaler: async(req, res)=>{
        //GET: /order/edit?id=1
        if(req.query.id != null){
            res.render("vwOrder/Order_saler_edit");
        }
        //GET: /order/edit
        else{
            res.render("vwOrder/Order_saler");
        }
        
    },
    
    
}