const { StatusCodes } = require('http-status-codes');
const Apperror=require('../utils/error/App-error');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const {fileHandlingService}=require('../services');
const upload=require('../config/multer-config');

async function uploadFile(req,res){
    
    upload.single('file')(req,res,async(err)=>{
         if(err){
            ErrorResponse.message="Unable to upload File"
            res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
         }
        try{
         if(req.file===undefined) throw new Apperror("No file provided, attach a file and try again",StatusCodes.BAD_REQUEST);
         const resP=await fileHandlingService.uploadFiles(req.file.path);
         SuccessResponse.data=resP;
         res.status(StatusCodes.OK).json(SuccessResponse);
        }
        catch(error){
            ErrorResponse.error=error;
            res.status(error.statusCode).json(ErrorResponse);
        }
    });
   
    
}

async function downloadFile(req,res){
    try{
     const fileName=req.body.fileName;
     if(!fileName){
       throw new Apperror("Please provide a valid file name to proceed",StatusCodes.BAD_REQUEST);
     }
     const fileUrl=await fileHandlingService.downloadFile(fileName);
     SuccessResponse.data=fileUrl;
     res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error=error;
        res.status(error.statusCode).json(ErrorResponse);
    }

}

module.exports={
    uploadFile,
    downloadFile

}
