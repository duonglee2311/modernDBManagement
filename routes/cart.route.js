const express=require('express');
const controller=require('../controller/cart.controller');
const router=express.Router();

router.get('/',controller.getCart);
router.get('/update',controller.updateCart);
router.get('/addCart',controller.addCart);




module.exports = router;