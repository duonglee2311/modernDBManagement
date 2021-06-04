const express=require('express');
const controller=require('../controller/cart.controller');
const router=express.Router();

router.get('/',controller.addCart);
router.get('/checkout',controller.checkout);


module.exports = router;