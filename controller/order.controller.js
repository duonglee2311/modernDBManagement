// const { async } = require('../model/order.model');
const orderModel = require('../model/order.model');
const userModel = require('../model/user.model');
module.exports={
    //GET: /order/checkout
    getcheckout: async(req, res)=>{
        let user = await userModel.getOneUser(req.session.user.userID);
        // console.log(user);
        res.render("vwCart/Checkout", {user :user[0]});
    },
    setCheckout: async(req,res)=>{
        let userid=req.session.user.userID;// lấy userID redis session
        console.log(req.body);
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
            console.log(req.query.id);
            let listOrder=await orderModel.getOrderDetail(req.query.id);
            console.log("list:",listOrder)
            res.render("vwOrder/Order_detail",{
                orderInfo: listOrder.orderInfo[0],
                delivery: listOrder.delivery,
                product: listOrder.product
            })
        }
    },
    
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
            console.log('vo day')
            let listOrder=await orderModel.getOrderDetail(req.query.id);
            console.log("o day",listOrder)
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
            console.log('tao thong bao o day');
            // alert("thong tin khong chinh xac");
            res.redirect('back');
        }
        let status;
        // thuc hien update
        await orderModel.updateOrder(req.query.id,req.query.status);
        res.redirect('back');
    }
}