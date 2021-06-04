const express=require('express');
const controller=require('../controller/collection.controller');
const router=express.Router();


router.get('/create',controller.createCollection);
// router.get('/:id',controller.editCollection);
router.get('/',controller.getCollection);


module.exports = router;