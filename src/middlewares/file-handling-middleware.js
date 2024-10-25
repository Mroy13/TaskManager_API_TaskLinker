const { StatusCodes } = require('http-status-codes');
const cloudinary=require('../config/cloudinary-config');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const fs=require('fs');
const upload=require('../config/multer-config');
async function uploadFiles(req,res,next){

    upload.single('file')(req,res,async(err)=>{
        if(err){
            ErrorResponse.message="Unable to upload File"
            res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }

        
       if(req.file==undefined)return next(); // No file provided, proceed to the next middleware
       try{
         //upload to cloudinary
        const cloudRes=await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'raw',
            folder:'TaskDoc'
         });
         fs.unlinkSync(req.file.path);
         req.body.fileName=cloudRes.original_filename;
         req.body.public_key=cloudRes.public_id;
         next();
       }
       catch(error){
           res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
       }
   });

}

async function downloadFiles(req,res,next){
    
}

module.exports={
    uploadFiles,
    downloadFiles
}