const express=require('express');
const controller=require('../../controller/collection.controller');
const router=express.Router();


router.get('/addProduct',controller.addProductToCollection);
router.get('/delProduct',controller.delProductFromCollection);
router.get('/deleteCollection', controller.deleteCollection);
router.post('/create',controller.handleCreateCollection);
router.get('/create',controller.createCollection);
// router.get('/:id',controller.editCollection);
router.get('/',controller.getCollection);



module.exports = router;