const cloudinary=require('../config/cloudinary-config');
const fs=require('fs');
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
        console.log(error);
        throw error;
    }

}

async function downloadFiles(){
  
}

module.exports={
    uploadFiles,
    downloadFiles
}