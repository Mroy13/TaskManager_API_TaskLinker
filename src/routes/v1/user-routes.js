const express=require('express');
const {userController}=require ('../../controllers');
//const {movieMiddleware}=require('../../middlewares');
const router=express.Router();
 router.post('/signup',userController.createUser);
 router.get('/tasks/:id',userController.getUserSpecificTask);
module.exports=router