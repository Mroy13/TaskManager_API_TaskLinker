const {TaskFile}=require('../models');
const crudRepository=require('./crud-repository');
const { Op } = require('sequelize');
class taskFilesRepository extends crudRepository{
    constructor(){
        super(TaskFile);
    }
    async getFileInfo(fileName){
         try{
            const fileInfo=await TaskFile.findOne({
                where: {
                    fileName: {
                        [Op.eq]: fileName
                    }
                }
            });
            return fileInfo;
         }
         catch(error){
            throw error;
         }
    }
}

module.exports=taskFilesRepository;