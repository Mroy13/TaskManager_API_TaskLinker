const express=require('express');
const {taskController}=require ('../../controllers');
//const {..Middleware}=require('../../middlewares');
const router=express.Router();
 router.post('/add',taskController.createTask);
// router.get('/',Controller.get);
// router.get('/:id',Controller.get);
module.exports=router