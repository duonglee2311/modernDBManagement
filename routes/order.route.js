const express=require('express');
const controller=require('../controller/order.controller');
const router=express.Router();

router.get('/',controller.getOrder);

module.exports = router;