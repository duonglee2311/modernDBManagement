const express=require('express');
const controller=require('../controller/order.controller');
const router=express.Router();


// router.get('/create',controller.createCollection);
// router.get('/:id',controller.editCollection);
router.get('/edit',controller.getOrderSaler);
router.get('/',controller.getOrder);
router.get('/checkout',controller.checkout);
router.post('/checkout',controller.setCheckout);


module.exports = router;