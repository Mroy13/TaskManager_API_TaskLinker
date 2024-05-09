const express=require('express');
const {taskController}=require ('../../controllers');
//const {..Middleware}=require('../../middlewares');
const router=express.Router();
 router.post('/add',taskController.createTask);
 router.get('/:id',taskController.findTask);
 router.patch('/up/:id',taskController.updateTask);
 router.delete('/remove/:id',taskController.removeTask);
// router.get('/',Controller.get);
// router.get('/:id',Controller.get);
module.exports=router