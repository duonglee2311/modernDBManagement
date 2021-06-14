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
            console.log(req.query.id);
            let listOrder=await orderModel.getOrderDetail(req.query.id);
            console.log("list:",listOrder)
            res.render("vwOrder/Order_detail",{
                orderInfo: listOrder.orderInfo[0],
                delivery: listOrder.delivery,
                product: listOrder.product
            })
        }
        else{ //GET: /order?id=1
            let listOrder=await orderModel.getOrder(123,0);
            res.render("vwOrder/Order_buyer",{listOrder: listOrder});
        }
    },
    
    getOrderSaler: async(req, res)=>{
        //GET: /order/edit?id=1
        if(req.query.id != null){
            console.log('vo day')
            let listOrder=await orderModel.getOrderDetail(req.query.id);
            console.log(listOrder)
            res.render("vwOrder/Order_saler_edit",{
                orderInfo: listOrder.orderHeader,
                delivery: listOrder.orderDelivery,
                product: listOrder.detailProduct
            });
        }
        //GET: /order/edit
        else{
            let listOrder=await orderModel.getOrder(369,1);
            res.render("vwOrder/Order_saler",{listOrder: listOrder});
        }
        
    },
    setDelivery: async(req,res)=>{
        if(!req.body.id || !req.body.status){
            console.log('tao thong bao o day')
        }
        // thuc hien update
        await orderModel.updateOrder(1231623504353035,"Cancelled");
        res.redirect('back');
    }
}