const orderModel = require('../model/order.model')
module.exports={
    //GET: /order
    getOrder: async(req,res)=>{
        orderModel.setOrder(123,'value')
        if(req.query.id != null){
            res.render("vwOrder/Order_detail")
        }
        else{ //GET: /order?id=1
            res.render("vwOrder/Order_buyer");
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
        
    }
    
    
}