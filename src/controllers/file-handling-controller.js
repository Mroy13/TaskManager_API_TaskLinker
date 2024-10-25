const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const {fileHandlingService}=require('../services');
const upload=require('../config/multer-config');

async function uploadFile(req,res){
    
    upload.single('file')(req,res,async(err)=>{
         if(err){
             res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
         }
        try{
         const resP=await fileHandlingService.uploadFiles(req.file.path);
         SuccessResponse.data=resP;
         res.status(StatusCodes.OK).json(SuccessResponse);
        }
        catch(error){
            res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
    });
   
    
}

module.exports={
    uploadFile,

}
