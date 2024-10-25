const express=require('express');
const {fileHandlingController}=require('../../controllers')
const router=express.Router();

router.post('/upload',fileHandlingController.uploadFile);
router.post('/download',fileHandlingController.downloadFile);
module.exports=router;
