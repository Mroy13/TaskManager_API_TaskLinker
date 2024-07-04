const express=require('express');
const {fileHandlingController}=require('../../controllers')
const router=express.Router();

router.post('/upload',fileHandlingController.uploadFile);
module.exports=router;
