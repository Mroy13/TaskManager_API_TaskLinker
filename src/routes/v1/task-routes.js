const express=require('express');
const {fileHandlingMiddleware}=require('../../middlewares');
const {taskController}=require ('../../controllers');
const router=express.Router();
 router.post('/add',fileHandlingMiddleware.uploadFiles,taskController.createTask);
 router.get('/:id',taskController.findTask);
 router.patch('/up/:id',taskController.updateTask);
 router.delete('/remove/:id',taskController.removeTask);
 router.patch('/mark/:id',taskController.markTask);
 router.patch('/addResponse/:id',fileHandlingMiddleware.uploadFiles,taskController.addTaskResponse);
module.exports=router