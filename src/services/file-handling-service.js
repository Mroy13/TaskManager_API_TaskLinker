const cloudinary=require('../config/cloudinary-config');
const { StatusCodes } = require('http-status-codes');
const {taskFilesRepository, taskRepository}=require('../repositories');
const fs=require('fs');
const Apperror=require('../utils/error/App-error');

const TaskFileRepository=new taskFilesRepository();
async function uploadFiles(filePath){
    try{
      const cloudRes=await cloudinary.uploader.upload( filePath, {
        resource_type: 'raw',
        folder:'TaskDoc'
     });
     fs.unlinkSync(filePath);
     return cloudRes.secure_url;
    } 
    catch(error){
       throw new Apperror("internal server problem",StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function downloadFile(filename){
   try{
    const fileDetails=await TaskFileRepository.getFileInfo(filename);
    if(fileDetails===null)throw new Apperror("The requested file is unavailable or may have been removed",StatusCodes.NOT_FOUND);
    const publicId=fileDetails.dataValues.public_Key;
    return cloudinary.url(publicId, {
       // version: 'v1',
        resource_type: 'raw', 
        // flags: 'attachment',
        // attachment: filename 
      });
   }
   catch(error){
     if(error instanceof Apperror)throw error;
     throw new Apperror("internal server problem",StatusCodes.INTERNAL_SERVER_ERROR);
   }
}

module.exports={
    uploadFiles,
    downloadFile
}