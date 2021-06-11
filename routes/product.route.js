const express=require('express');
const controller=require('../controller/product.controller');
const router=express.Router();

router.get('/',controller.getProduct);
router.get('/edit',controller.editProduct);
router.post('/edit',controller.handleEditProduct);
router.get('/add', controller.addProduct);
router.post('/add',controller.handleAddProduct);
router.get('/delete',controller.deleteProduct);
router.post('/:id/comment',controller.handleAddComment);

module.exports = router;