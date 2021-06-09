const order= require('../model/order.model');

module.exports={
    getOrder: (req, res)=>{
        order.setOrder();
        res.send("ok");
    }
}