const express=require('express');
const {taskController}=require ('../../controllers');
//const {..Middleware}=require('../../middlewares');
const router=express.Router();
 router.post('/add',taskController.createTask);
 router.get('/:id',taskController.findTask);
 router.patch('/up/:id',taskController.updateTask);
 router.delete('/remove/:id',taskController.removeTask);
 router.patch('/mark/:id',taskController.markTask);
 router.patch('/addResponse/:id',taskController.addTaskResponse);
module.exports=router