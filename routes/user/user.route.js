const express=require('express');
const user=require('../../controller/user.controller');
const router=express.Router();


router.get('/',user.getUser);
router.get('/profile/:id',user.profileUser);
router.post('/profile/:id', user.handleEditUser);

module.exports = router;