const express=require('express');
const controllerOrder=require('../../controller/order.controller');
const controllerProduct=require('../../controller/product.controller');
const router=express.Router();


// router.get('/create',controller.createCollection);
// router.get('/:id',controller.editCollection);
router.get('/',controllerProduct.editProduct)
router.get('/order',controllerOrder.getOrderSaler);
router.get('/order/update',controllerOrder.setDelivery);
// router.get('/',controller.getOrder);


module.exports = router;