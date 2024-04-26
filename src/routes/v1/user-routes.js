const express=require('express');
const {userController}=require ('../../controllers');
//const {movieMiddleware}=require('../../middlewares');
const router=express.Router();
 router.post('/signup',userController.createUser);
// router.get('/',Controller.get);
// router.get('/:id',Controller.get);
module.exports=router