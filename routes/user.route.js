const express=require('express');
const user=require('../controller/user.controller');
const router=express.Router();

router.get('/',user.getUser);
router.get('/edit/:id', user.editUser);


module.exports = router;