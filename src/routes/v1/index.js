const express=require('express');
const { infoController} = require('../../controllers');
const userRoutes=require('./user-routes');
const taskRoutes=require('./task-routes');
const router=express.Router();
router.use('/user',userRoutes);
router.use('/task',taskRoutes);
router.get('/info',infoController.info);
module.exports=router;
