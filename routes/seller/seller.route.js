const express=require('express');
const controller=require('../../controller/order.controller');
const router=express.Router();


// router.get('/create',controller.createCollection);
// router.get('/:id',controller.editCollection);
router.get('/order',controller.getOrderSaler);
router.get('/order/update',controller.setDelivery);
// router.get('/',controller.getOrder);


module.exports = router;