const express=require('express');
const { infoController} = require('../../controllers');
const userRoutes=require('./user-routes');
const router=express.Router();
router.use('/user',userRoutes);
router.get('/info',infoController.info);
module.exports=router;
