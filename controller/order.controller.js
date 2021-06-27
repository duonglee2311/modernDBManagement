// const { async } = require('../model/order.model');
const orderModel = require('../model/order.model');
const userModel = require('../model/user.model');
module.exports={
    //GET: /order/checkout
    getcheckout: async(req, res)=>{
        let user = await userModel.getOneUser(req.session.user.userID);
        console.log(user);
        res.render("vwOrder/Checkout", {user :user[0]});
    },
    //POST: /order/checkout
    setCheckout: async(req,res)=>{
        let userid=req.session.user.userID;
        await orderModel.setOrder(userid,req.body);
        res.redirect('/order');
    },
    //GET: /order
    getOrder: async(req,res)=>{
        if(req.query.id === undefined){
            let listOrder=await orderModel.getOrder(req.session.user.userID,0);
            res.render("vwOrder/Order_buyer",{listOrder: listOrder});
        }
        else{ //GET: /order?id=1
            let listOrder=await orderModel.getOrderDetail(req.query.id);
            res.render("vwOrder/Order_detail",{
                orderInfo: listOrder.orderInfo[0],
                delivery: listOrder.delivery,
                product: listOrder.product
            })
        }
    },
    // GET: /
    getOrderSaler: async(req, res)=>{
        //GET: /order/edit?id=1
        if(req.query.id === undefined){
            let listOrder=await orderModel.getOrder(req.session.user.userID,1);
            res.render("vwOrder/Order_saler",{
                listOrder: listOrder,
                layout: 'seller',
            });
        }
        //GET: /order/edit
        else{
            let listOrder=await orderModel.getOrderDetail(req.query.id);
            res.render("vwOrder/Order_saler_edit",{
                orderInfo: listOrder.orderInfo[0],
                delivery: listOrder.delivery,
                product: listOrder.product,
                layout: 'seller',
            });
        }
    },
    setDelivery: async(req,res)=>{
        if(!req.query.id || !req.query.status){
            res.redirect('back');
        }
        let status;
        // thuc hien update
        await orderModel.updateOrder(req.query.id,req.query.status);
        res.redirect('back');
    }
}