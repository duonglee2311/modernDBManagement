const express=require('express');
const controller=require('../controller/product.controller');
const router=express.Router();

router.get('/',controller.getProduct);
router.get('/edit',controller.editProduct);
router.get('/edit/:id',controller.detailProduct);

module.exports = router;