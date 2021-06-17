const express=require('express');
const controller=require('../../controller/order.controller');
const router=express.Router();


// router.get('/edit',controller.getOrderSaler);
router.get('/',controller.getOrderSaler);
// router.get('/checkout',controller.getcheckout);
// router.post('/checkout',controller.setCheckout);
// router.get('/update',controller.setDelivery);


module.exports = router;