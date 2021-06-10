const express=require('express');
const controller=require('../controller/cart.controller');
const router=express.Router();

router.get('/',controller.addCart);




module.exports = router;